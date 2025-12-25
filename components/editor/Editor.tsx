"use client";

import dynamic from "next/dynamic";

const EditorClient = dynamic(
    () => import("./EditorClient"),
    { ssr: false }
);

export default function Editor({
                                   value,
                                   onChangeHtml,
                               }: {
    value: string;
    onChangeHtml: (html: string) => void;
}) {
    return <EditorClient value={value} onChangeHtml={onChangeHtml} />;
}
