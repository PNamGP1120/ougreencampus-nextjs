"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { Editor } from "@ckeditor/ckeditor5-core";

interface Props {
    value: string;
    onChangeHtml: (data: string) => void;
}

export default function EditorClient({ value, onChangeHtml }: Props) {
    return (
        <CKEditor
            editor={ClassicEditor as unknown as { create: (...args: any[]) => Promise<Editor> }}
            data={value}
            onChange={(_, editor) => {
                const data = editor.getData();
                onChangeHtml(data);
            }}
        />
    );
}
