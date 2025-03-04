import { Principal } from "@dfinity/principal";
import { backend } from "./backend";
import { toast } from "react-toastify";

const getBalance = async (): Promise<number> => {
    try {
        const principalStr = await window.ic?.plug?.agent?.getPrincipal();
        if (!principalStr) throw new Error('No principal found');

        console.log('Principal:', principalStr.toString());

        // Konversi string principal ke tipe Principal
        const principal = Principal.fromText(principalStr.toString());

        const balance = await backend.checkBalance(principal);
        console.log('Balance:', balance);

        return Number(balance);
    } catch (e) {
        toast.error('Error fetching balance', {
            position: 'top-center',
        });
        console.error('Error fetching balance:', e);
        return 0;
    }
};

export default getBalance;