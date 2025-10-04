import { useCallback, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginRequest, MeRequest, LogoutRequest } from "@/services/api/auth/login";
import { useDirect } from "@/hooks/useDirect";
import { schemaFormLogin } from "@/utilities/schema/form/login";
import type { MenuItemType } from "@/types/menu/menu";
import type { 
    ResponsePaload,
    FormSchemaLogin
 } from "@/types/form/login";

export const useAuth = () => {
    const { goDashboard } = useDirect();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    const onSubmit = useCallback(async (values: FormSchemaLogin) => {
        setLoading(true);
        setError(null);
        try {
            const res = await LoginRequest(values);

            if (res) {
                goDashboard();
            }
        } catch {
            setError("Login gagal");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [goDashboard]);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await MeRequest();
            if (data) {
                setPayload(data);
            }
        };
        fetchUser();
    }, []);

    const logout = useCallback(async () => {
        await LogoutRequest();
    }, []);

    return { formLogin, onSubmit, loading, error, payload, menuItemsAuth, logout };
};