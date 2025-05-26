import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../features/news/newsSlice";
import Layout from "../components/Layout";



const NewsPage = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(getNews("us"));

  }, [dispatch]);

  return (
    <Layout title='News'>
      <main className="">
        {status === "loading" && (
          <p className="text-center text-gray-600">در حال بارگذاری...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-red-600">خطا: {error}</p>
        )}
        {status === "succeeded" &&
          articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 mb-6 transition-transform hover:scale-[1.01]"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {article.description || "توضیحی موجود نیست."}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                countinue news →
              </a>
            </div>
          ))}
      </main>
    </Layout>
  );
};

export default NewsPage;
