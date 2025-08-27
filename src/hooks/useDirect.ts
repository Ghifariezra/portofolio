import { useRouter } from "next/navigation";

export const useDirect = () => {
    const router = useRouter()

    const goHome = () => {
        router.push('/')
    }

    return { goHome }
}