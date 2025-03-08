import { useAuth } from '../utility/use-auth-client';
import { motion } from "framer-motion"
import LoggedOut from './LoggedOut';
import { useEffect } from 'react';
import { Principal } from '@dfinity/principal';
import { useNavigate } from 'react-router-dom';
import pageVariants from '@/utility/page-variants';
import { User_backend } from "@/declarations/User_backend";

export default function OnboardPage() {
    const { principal, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        handleIfRegistered();
    }, [isAuthenticated]);

    const handleIfRegistered = async () => {
        console.log("IsAuthenticated: " + isAuthenticated + "\nPrincipal: " + principal);
        if(!isAuthenticated || !principal) {
            return;
        };

        let [user] = await User_backend.getUser(principal!);
        console.log("User: " + user + "\nIsAuthenticated: " + isAuthenticated + "\nResult: " + isAuthenticated && user);
        if (isAuthenticated && user) {
            navigate('/landing')
        }else {
            navigate('/register')
        };
    }
    return (
        <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
            <LoggedOut />
        </motion.div>
    );
}