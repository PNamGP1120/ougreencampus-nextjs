"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
    value: string;
    onChangeHtml: (data: string) => void;
}

export default function EditorClient({ value, onChangeHtml }: Props) {
    return (
        <CKEditor
            editor={ClassicEditor as any} // ✅ FIX CUỐI CÙNG
            data={value}
            onChange={(_, editor) => {
                const data = editor.getData();
                onChangeHtml(data);
            }}
        />
    );
}
