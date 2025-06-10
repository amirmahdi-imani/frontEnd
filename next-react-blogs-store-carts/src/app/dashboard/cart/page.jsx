'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCart, updateQuantity, removeFromCartDB } from './cartSlice';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const cart = useSelector(state => state.cart.items);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, [user]);

  useEffect(() => {
    if (initialized && !user) {
      router.push('/auth/login');
    }
    if (user) {
      dispatch(fetchCart({ user_id: user.id }));
    }
  }, [initialized, user, router, dispatch]);

  const increase = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const decrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const remove = (id) => {
    dispatch(removeFromCartDB(id));
  };

  const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0);

  if (!initialized) {
    return <p className="text-center mt-20 text-gray-400">waiting .....</p>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-row justify-between text-2xl ">
        <h1 className="ml-4 font-bold text-gray-100">Your shopping cart</h1>
        <div className="text-3xl">🛒</div>
      </div>

      {cart.map((item) => {
        let images = [];
        try {
          images = JSON.parse(item.img.replace(/'/g, '"'));
        } catch {
          images = [];
        }
        const imgSrc = images.length > 0 ? images[0] : '/default-image.jpg';

        return (
          <div key={item.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow">
            <img src={imgSrc} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 ml-4 space-y-1">
              <p className="text-gray-800 font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">Price: {(parseFloat(item.price) || 0).toLocaleString()} usd</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => decrease(item.id, item.quantity)} className="bg-gray-500 px-2 py-1 rounded hover:bg-blue-600/90">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item.id, item.quantity)} className="bg-gray-500 px-2 py-1 rounded hover:bg-rose-700/90">+</button>
            </div>
            <p className="w-32 text-center text-gray-800">
              {((parseFloat(item.price) || 0) * item.quantity).toLocaleString()} usd
            </p>
            <button onClick={() => remove(item.id)} className="text-rose-600/90 hover:text-rose-800/90 text-3xl">
              🗑
            </button>
          </div>
        );
      })}

      <div className="flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-gray-300 font-semibold"> Total :</p>
          <p className="text-xl text-green-600">{total.toLocaleString()} usd</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-100 text-blue-800/90 px-4 py-2 rounded hover:bg-blue-300/95">
            Buy another product
          </button>
          <button className="bg-green-700/95 text-white px-6 py-2 rounded hover:bg-green-700">
            Payment 💳
          </button>
        </div>
      </div>
    </div>
  );
}
