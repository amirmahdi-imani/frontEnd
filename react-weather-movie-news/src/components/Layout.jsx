import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";





const Layout = ({children,title})=>{
    const isLoggedIn =true;




    return (    
    <div className="bg-gradient-to-br from-indigo-500 to-white-700">

      {/* Navbar */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-700 text-white text-xl p-6 shadow flex items-center justify-between px-10">
        <Link to="/" className="text-white hover:underline cursor-pointer">Menu</Link>
        <div className="text font-bold ">{title}</div>
        <div className="relative">
            <Link onClick={()=>{alert('sjf')}}>
                <RiAccountCircleFill className="text-gray-300 text-4xl cursor-pointer" />
                {isLoggedIn && (
                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white" />
                )}
            </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen flex-1 p-6 max-w-4xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        🌐 My {title} Footer
      </footer>
    </div>   
    )
}

export default Layout;