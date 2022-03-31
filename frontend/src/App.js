import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Loggin from './components/Loggin';
import ProtectedRoute from './utils/ProtectedRoute';
import Formulario from './components/Formulario';
import Product from './components/Product';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loggin />} />
        <Route path="/login" element={<Loggin />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Formulario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
