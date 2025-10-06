import { useState, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/app/_components/ui/button";
import { Copy } from "lucide-react";

interface CodeBlockProps {
    code: string;
    language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Gagal menyalin kode:", error);
            // Opsional: Tampilkan pesan error ke pengguna
        }
    }, [code]);

    return (
        <div className="relative">
            <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 z-10 flex gap-2 cursor-pointer w-fit p-2"
                onClick={handleCopy}
            >
                <span className="sr-only">Copy code</span>
                <Copy />
                {copied ? "Copied!" : "Copy"}
            </Button>
            <div className="absolute top-2 right-2 z-10">

            </div>
            <SyntaxHighlighter
                style={oneDark}
                language={language}
                showLineNumbers
                wrapLongLines
                wrapLines
                codeTagProps={{ className: "text-sm font-mono tracking-tight" }}
                customStyle={{ marginBottom: "1rem" }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
