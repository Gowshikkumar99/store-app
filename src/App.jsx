import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "./pages/ProductPage/ProductPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { fetchCategories, fetchProducts } from "./redux/slices/productSlice";
import { useEffect } from "react";
import ToastMessage from "./components/toast/ToastMessage";
import "./App.scss";

export default function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const { show, message, variant } = useSelector((state) => state.toast);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <Spinner animation="border" role="status" />
        <strong className="mt-2">Loading...</strong>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-danger">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/products" element={<Dashboard />} />
          <Route path="/edit/:id" element={<ProductPage />} />
          <Route path="/add" element={<ProductPage />} />
          {/* <Route path="*" element={<Navigate to="/products" replace />} /> */}
        </Routes>
      </main>
      <Footer />
      {show && (
        <ToastMessage
          message={message}
          variant={variant}
          onClose={() => dispatch(hideToast())}
        />
      )}
    </div>
  );
}
