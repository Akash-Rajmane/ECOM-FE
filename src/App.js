import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const token = localStorage.getItem("token");
  const { setCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BE_ENDPOINT}/api/cart`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(res);

        if (res.ok) {
          const payload = await res.json();
          //  console.log(data);
          setCart(payload);
        } else {
          console.error("Failed to fetch products:", res.statusText);
          toast.error(res.statusText);
        }
      } catch (error) {
        toast.error(error);
        console.error("Error fetching products:", error.message);
      }
    };
    if (isAuthenticated) {
      fetchCart();
    }
  }, [token, isAuthenticated]);

  return (
    <>
      <ToastContainer limit={1} autoClose={5000} />
      <Header />
      <main style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
