import { useDispatch, useSelector } from 'react-redux';
import { Link,Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

function  ProtectedLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div>
          {user ? (
            <button onClick={handleLogout} className="nav-btn">Logout</button>
          ) : (
            <Link to="/login" className="nav-btn">Login</Link>
          )}
        </div>
      </nav>
      
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout