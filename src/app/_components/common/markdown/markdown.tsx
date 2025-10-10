'use client';

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { CodeBlock } from "@/app/_components/common/markdown/code/code";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export function Markdown({ content, lang }: {
    content: string;
    lang?: string;
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
            <ol className="list-decimal list-outside mb-4  space-y-3">
                {children}
            </ol>
        ),

        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 break-words">
                {children}
            </blockquote>
        ),
        code({ children, className }) {
            const sourceCode = Array.isArray(children)
                ? children.join('')
                : typeof children === 'string'
                    ? children
                    : '';

            const cleanCode = sourceCode.replace(/\n+$/, '');

            const match = /language-(\w+)/.exec(className || '');

            const language = match ? match[1] : lang || 'plaintext';
            console.log('language', language);

            if (match) {
                // Ini block code (```)
                return <CodeBlock code={cleanCode} language={language} />;
            }

            // Ini inline code (`...`)
            return (
                <code className="bg-muted px-1 rounded text-sm font-mono">
                    {cleanCode}
                </code>
            );
        },
        a: ({ href, children }) => (
            <Link
                href={href?.toString() ?? "#"}
                target="_blank"
                className="text-blue-800 dark:text-blue-400 underline underline-offset-4 hover:underline">
                {children}
            </Link>
        ),
        hr: () => <hr className="my-4" />,
        img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            if (!alt || typeof alt !== "string") return null;

            return (
                <Image
                    src={src}
                    alt={alt}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                />
            );
        },
        table: ({ children }) => (
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 my-4 text-sm">
                {children}
            </table>
        ),
        thead: ({ children }) => (
            <thead className="bg-gray-100 dark:bg-gray-700">
                {children}
            </thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
            <tr className="border-b border-gray-300 dark:border-gray-600">
                {children}
            </tr>
        ),
        th: ({ children }) => (
            <th className="px-4 py-2 text-left font-semibold border border-gray-300 dark:border-gray-600">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                {children}
            </td>
        ),

    });

    return (
        <article className="prose prose-gray max-w-none dark:prose-invert">
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    remarkBreaks
                ]}
                components={MarkdownComponents}
            >
                {content}
            </ReactMarkdown>
        </article>
    )
}