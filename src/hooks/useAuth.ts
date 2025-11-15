import { useCallback, useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDirect } from "@/hooks/useDirect";
import { schemaFormLogin } from "@/utilities/schema/form/login";
import AdminService from "@/services/api/auth";
import { toast } from "sonner";
import type { MenuItemType } from "@/types/menu/menu";
import type {
    ResponsePaload,
    FormSchemaLogin
} from "@/types/form/login"; 
import { AxiosError } from "axios";

export const useAuth = () => {
    const { goDashboard } = useDirect();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState<ResponsePaload | null>(null);
    const [menuItemsAuth] = useState<MenuItemType[]>([
        { name: "Logout", href: "/" },
    ]);

    const formLogin = useForm<FormSchemaLogin>({
        resolver: zodResolver(schemaFormLogin),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const adminService = useMemo(() => new AdminService(), []);

    const onSubmit = useCallback(async (values: FormSchemaLogin) => {
        setLoading(true);
        try {
            const res = await adminService.Login(values);

            if (res) {
                goDashboard();
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 429) {
                    formLogin.reset();

                    toast.error("Sorry bro, you are rate limited. Please try again later.");
                    
                    return;
                }
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    }, [goDashboard, adminService, formLogin]);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await adminService.Me();
            if (data) {
                setPayload(data);
            }
        };
        fetchUser();
    }, [adminService]);

    const logout = useCallback(async () => {
        await adminService.Logout();
    }, [adminService]);

    return { formLogin, onSubmit, loading, payload, menuItemsAuth, logout };
};