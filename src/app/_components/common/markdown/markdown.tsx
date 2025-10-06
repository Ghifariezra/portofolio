'use client';

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/app/_components/common/markdown/code/code";

export function Markdown({ content, lang }: {
    content: string;
    lang: string;
}) {
    const [MarkdownComponents] = useState<Components>({
        h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold mb-3">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold mb-2">
                {children}
            </h3>
        ),
        p: ({ children }) => (
            <p className="mb-4 leading-relaxed">
                {children}
            </p>
        ),
        ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">
                {children}
            </ol>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 break-words">
                {children}
            </blockquote>
        ),
        code({
            children
        }) {
            const sourceCode = (children as string).replace(/\n+$/, '');
            return <CodeBlock code={sourceCode} language={lang} />;
        },
        a: ({ href, children }) => (
            <Link
                href={href?.toString() ?? "#"}
                target="_blank"
                className="text-blue-800 dark:text-blue-400 underline underline-offset-4 hover:underline">
                {children}
            </Link>
        ),
    });

    return (
        <article className="prose prose-gray max-w-none dark:prose-invert">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
            >
                {content}
            </ReactMarkdown>
        </article>
    )
}