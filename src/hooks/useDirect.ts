import { useRouter } from "next/navigation";

export const useDirect = () => {
    const router = useRouter()

    const goHome = () => {
        router.push('/')
    }

    const goDashboard = () => {
        router.push('/dashboard');
        window.location.reload();
    };

    return { goHome, goDashboard }
}