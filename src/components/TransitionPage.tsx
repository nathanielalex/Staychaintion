import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TransitionPageProps {
  children: ReactNode;
}

const TransitionPage = ({ children }: TransitionPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Mulai dari transparan dan sedikit turun
      animate={{ opacity: 1, y: 0 }} // Muncul dengan smooth
      exit={{ opacity: 0, y: -20 }} // Pergi dengan smooth
      transition={{ duration: 0.5 }} // Waktu transisi 0.5 detik
    >
      {children}
    </motion.div>
  );
};

export default TransitionPage;
