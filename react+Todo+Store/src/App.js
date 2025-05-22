// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import TodoPage from './Pages/TodoPage';
import LoginPage from './Pages/LoginPage'; 
import QuotesPage from './Pages/QuotesPage'; 
import FakeStore from './Pages/FakeStore';
import './bootstrap.css'
import'./styles/global.css'
import SignUpPage from './Pages/SignUpPage';
import ProtectedLayout from './layouts/ProtectedLayout';
import PrivateRoute from './Pages/PrivateRoute';
import {Toaster} from 'react-hot-toast'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage/>}/>
        
        <Route element={<ProtectedLayout/>}>
          <Route path='/fakestore' element={<FakeStore/>}/>
          <Route path="/" element={<Menu />} />
          <Route
           path="/todo" element={
             <PrivateRoute>
                <TodoPage />
           </PrivateRoute>
           } />
           <Route
            path="/quotes" element={
            <PrivateRoute>
            <QuotesPage />
            </PrivateRoute>
              } />
        </Route>

      </Routes>


      <Toaster/>
    </Router>
  );
}

export default App;
