import { 
    useBlogsQuery
} from "@/hooks/query/useBlogsQuery";
import { easeIn, easeOut } from "motion/react";

export const useBlogs = () => {
    const { 
        data: blogs, 
        isLoading: isLoadingBlogs, 
    } = useBlogsQuery();

    const containerMotion = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
            },
        };
    
        const childMotion = {
            hidden: { opacity: 0, y: -30 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    ease: easeOut
                }
            },
            exit: {
                opacity: 0,
                y: 30,
                transition: {
                    duration: 1,
                    ease: easeIn
                }
            },
        };

    return { 
        blogs, 
        isLoadingBlogs,
        containerMotion,
        childMotion
     };
};