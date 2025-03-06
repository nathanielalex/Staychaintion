import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Akan dijalankan setiap kali pathname berubah

  return null; // Tidak menampilkan apa pun di layar
};

export default ScrollToTop;