import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchProducts } from "./fakeStoreSlice";
import {addToCart, removeFromCart, clearCart} from '../cart/cartSlice'




function FakeStoreForm() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.fakeStore);
  const cartItems = useSelector((state) => state.cart.item)

  useEffect(() => {
    dispatch(fetchProducts());
                   },
            [dispatch]);

   if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error}</p>;

  return (
    <div className="container">
  <div className="row">
{/* ستون محصولات */}
<div className="col-md-8">
  <div className="products-box">
    <h2 className="my-4">لیست محصولات</h2>
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3 mb-4">
          <div className="card h-100">
            <img src={product.image} className="card-img-top p-9" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description.substring(0, 40)}...</p>
              <p className="card-text"><strong>{product.price} $</strong></p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => dispatch(addToCart(product))}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


<div className="col-md-4">
  <div className="cart-section">
    <h4>🛒 سبد خرید</h4>
    {cartItems.length === 0 ? (
      <p>سبد خرید خالی است.</p>
    ) : (
      <>
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {item.title} × {item.quantity}
                <div className="text-muted small">{(item.price * item.quantity).toFixed(2)} $</div>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-sm btn-danger w-100 mt-3"
          onClick={() => dispatch(clearCart())}
        >
          🧹 پاک‌سازی سبد خرید
        </button>
      </>
    )}
  </div>
</div>

  </div>
</div>

  );
};

export default FakeStoreForm;