import { useAuth } from '../utility/use-auth-client';
import { motion } from "framer-motion"
import LoggedOut from './LoggedOut';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pageVariants from '@/utility/page-variants';

export default function OnboardPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/register');
    }, [isAuthenticated]);

    return (
        <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
            <LoggedOut />
        </motion.div>
    );
}