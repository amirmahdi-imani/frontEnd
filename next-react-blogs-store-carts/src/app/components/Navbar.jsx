import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-gray-800 border-b border-gray-700 shadow-md">
      <div className="flex space-x-7 items-center text-2xl font-bold tracking-wide text-gray-200 relative">
        <Link href="/about" className="hover:text-white transition-colors duration-300">
          About
        </Link>

        <div className="group relative">
          <span className="cursor-pointer hover:text-white transition-colors duration-300">
            Dashboard
          </span>

          <div className="absolute space-y-2 hidden w-57 font-normal text-sm group-hover:block bg-gray-800 z-50">
            <Link
              href="/dashboard/blogManagement"
              className="block px-3 py-3 text-gray-300 hover:bg-gray-700/70 hover:text-white "
            >
              Blog Management
            </Link>
            
            <Link
              href="/dashboard/cart"
              className="block px-3 py-3 text-gray-300 hover:bg-gray-700/70 hover:text-white "
            >
              Shopping Cart Management
            </Link>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="font-extrabold text-3xl text-gray-500 hover:text-gray-600 transition-colors duration-300"
      >
        App
      </Link>
    </nav>
  );
}
