import { useState, useCallback, useEffect, useMemo } from "react";
import AssetsQueries from "@/hooks/query/useAssetsQuery";
import type { AssetItem } from "@/types/response/assets";

export function useCertificates() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const assetsQueries = useMemo(() => new AssetsQueries(), []);
    const { data, isLoading, isError } = assetsQueries.useCertificatesQuery();

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
