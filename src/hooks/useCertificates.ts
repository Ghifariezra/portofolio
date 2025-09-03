import { useState, useCallback, useEffect } from "react";
import { useCertificatesQuery } from "@/hooks/query/useAssetsQuery";
import type { AssetItem } from "@/types/response/assets";

export function useCertificates() {
    const { data, isLoading, isError } = useCertificatesQuery();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = useCallback((certificates: AssetItem[]) => {
        setCurrentIndex((prev) =>
            prev === certificates.length - 1 ? 0 : prev + 1
        );
    }, []);

    useEffect(() => {
        if (!data?.assets?.certificates?.length) return;
        const interval = setInterval(() => {
            handleNext(data.assets.certificates);
        }, 3000);
        return () => clearInterval(interval);
    }, [data, handleNext]);

    return { data, isLoading, isError, currentIndex };
}
