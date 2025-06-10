import React from "react";

export default function About() {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700/90">
        About Me and This Project
      </h1>

      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        Hello and welcome! This page gives a quick introduction about me and the online store project I’ve built with effort and dedication.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700/90">About the Site</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        This is a professional e-commerce site designed to offer a smooth and dynamic shopping experience. You can:
      </p>
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        <li>Browse and search a variety of products</li>
        <li>Manage a smart shopping cart with easy quantity adjustments</li>
        <li>Sign up and log in to access a private dashboard</li>
        <li>Read regularly updated blog posts</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700/90">Challenges and Solutions</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Building this system involved challenges like complex state management, page coordination, secure authentication, and performance optimization.  
        To tackle these, I used:
      </p>
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        <li><strong>Next.js:</strong> for app structure and server-side rendering</li>
        <li><strong>Redux Toolkit:</strong> for smart state management</li>
        <li><strong>Supabase:</strong> as database and authentication backend</li>
        <li><strong>React Hook Form and Zod:</strong> for forms and validation</li>
        <li><strong>TailwindCSS and ShadCN:</strong> for responsive and elegant design</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700/90">About Me</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        I’m Amir Mahdi Imani, with a Bachelor's in Biomedical Engineering and two years of graduate studies in Biomedical Engineering (Bioelectric) at Tarbiat Modares University.  
        I’m passionate about programming and web development and always eager to learn more.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700/90">Get in Touch</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Feel free to visit my profiles and share your thoughts: <br />
        <a
          href="https://www.linkedin.com/in/amirmahdi-imani"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 hover:underline"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/amirmahdi-imani"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700/90 hover:underline"
        >
          GitHub
        </a>
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700/90">Thanks</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Thanks for visiting my site! I hope you find it useful and enjoyable.  
        If you have any questions or suggestions, I’d love to hear from you.
      </p>

      <p className="text-sm text-gray-500 mt-8 italic">
        Note: I used ChatGPT to assist me with coding and planning during the development of this project.
      </p>
    </section>
  );
}
