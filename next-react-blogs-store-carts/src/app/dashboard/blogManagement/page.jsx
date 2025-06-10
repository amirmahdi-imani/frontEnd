'use client'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from './BlogPage.module.css';
import { fetchBlogs, updateBlog, addBlog, deleteBlog } from './blogSlice';

export default function BlogPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const blogs = useSelector(state => state.blog.items);

  const [initialized, setInitialized] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState({ title: '', subject: '', description: '' });

  useEffect(() => {
    setInitialized(true);
  }, [user]);

  useEffect(() => {
    if (initialized && !user) {
      router.push('/auth/login');
    }
    if (user) {
      dispatch(fetchBlogs({ user_id: user.id }));
    }
  }, [initialized, user, router, dispatch]);

  const openEditor = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setForm({
        title: blog.title,
        subject: blog.subject,
        description: blog.description,
      });
    } else {
      setEditingBlog(null);
      setForm({ title: '', subject: '', description: '' });
    }
    setEditorOpen(true);
  };

  const handleSubmit = () => {
    if (editingBlog) {
      dispatch(updateBlog({
        id: editingBlog.id,
        updatedData: { ...form },
      }));
    } else {
      dispatch(addBlog({
        ...form,
        user_id: user.id,
        date: new Date().toISOString(),
      }));
    }
    setEditorOpen(false);
    setEditingBlog(null);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (editingBlog) {
      dispatch(deleteBlog(editingBlog.id));
      setEditorOpen(false);
      setEditingBlog(null);
    }
  };

  if (!initialized) {
    return <p className="text-center mt-20 text-gray-400">Loading...</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Blogs</h1>
        <button
          onClick={() => openEditor()}
          className={styles.addButton}
          aria-label="Add new blog"
        >
          + Add New Blog
        </button>
      </header>

      <main className={styles.blogsContainer}>
        {blogs.map((blog, i) => (
          <div
            key={blog.id}
            onClick={() => openEditor(blog)}
            className={`${styles.blogCard} ${styles['spinSlow' + ((i % 3) + 1)]}`}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') openEditor(blog); }}
            aria-label={`Edit blog titled ${blog.title}`}
          >
            <h2 className={styles.blogTitle}>{blog.title}</h2>
            <p className={styles.blogSubject}>{blog.subject}</p>
            <p className={styles.blogDescription}>{blog.description}</p>
            <p className={styles.blogDate}>
              {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </main>

      {editorOpen && (
        <div className={styles.editorOverlay}>
          <div className={styles.editorModal}>
            <button
              onClick={() => setEditorOpen(false)}
              className={styles.closeButton}
              aria-label="Close editor"
            >
              &times;
            </button>
            <h2 className={styles.editorTitle}>
              {editingBlog ? 'Edit Blog' : 'New Blog'}
            </h2>

            <div className={styles.editorForm}>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className={styles.input}
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className={styles.textarea}
              />

              <div className={styles.editorButtons}>
                {editingBlog && (
                  <button
                    onClick={handleDelete}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  className={styles.saveButton}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
