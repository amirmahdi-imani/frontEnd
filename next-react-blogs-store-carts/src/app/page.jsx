import { Button } from "./components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <main className="relative min-h-[85vh] flex flex-col justify-center items-center px-8 md:px-16 py-16 text-center text-gray-100 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Next.js E-Commerce <span className="text-blue-500">Showcase</span>
        </h1>

        <p className="mt-8 text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed font-light">
          This project showcases my ability to build scalable and modern web applications using{" "}
          <span className="font-semibold text-blue-400">Next.js</span>,{" "}
          <span className="font-semibold text-blue-400">Supabase</span>, and{" "}
          <span className="font-semibold text-blue-400">Redux Toolkit</span>.  
          Designed with a sleek dark theme and advanced UI components, it offers a complete e-commerce experience featuring product listings, authentication, and state management.
        </p>

        <Link href="./products">
          
            <Button className="mt-12 px-10 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-colors duration-300">
              Explore Products
            </Button>
          
        </Link>

    </main>
  )
}
