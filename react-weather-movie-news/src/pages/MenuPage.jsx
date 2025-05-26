import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { MdFirstPage } from "react-icons/md";


function MenuPage(){
const navigate = useNavigate();
const [isOpen, setIsOpen] = useState(false);
const [showHint, setShowHint] = useState(true);

const menuItem = [
    {label:'Live News', path:'/news'},
    {label:'Weather', path:'/weather'},
    {label:'TV / Movies', path:'/movies'}
];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setShowHint(false);
  };

    return(
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white relative overflow-hidden">

      
      {showHint && !isOpen && (
        <span className="absolute animate-ping inline-flex h-14 w-14 rounded-full bg-indigo-300 opacity-75 top-1/2 -left-6 transform -translate-y-1/2 z-20"></span>
      )}

     
      <button
        onClick={toggleMenu}
        className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white text-indigo-600 p-3 rounded-full shadow-lg hover:scale-105 transition z-30"
      >
        <MdFirstPage
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>

      
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold tracking-wider drop-shadow-lg">
          Welcome to the Info Hub 🌤️📺📰
        </h1>
      </div>

      
      <div
        className={`absolute top-0 right-0 h-full bg-white text-indigo-700 w-60 p-6 transition-transform duration-500 shadow-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Menu</h2>
        <ul className="space-y-4">
          {menuItem.map((item) => (
            <li
              key={item.path}
              className="cursor-pointer hover:underline hover:text-indigo-900"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
    )
}


export default MenuPage;