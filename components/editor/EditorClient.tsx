"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CloudinaryUploadAdapter from "./CloudinaryUploadAdapter";

export default function EditorClient({
                                         value,
                                         onChangeHtml,
                                     }: {
    value: string;
    onChangeHtml: (html: string) => void;
}) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
                extraPlugins: [
                    function MyUploadAdapterPlugin(editor: any) {
                        editor.plugins
                            .get("FileRepository")
                            .createUploadAdapter = (loader: any) => {
                            return new CloudinaryUploadAdapter(loader);
                        };
                    },
                ],
            }}
            onChange={(_, editor) => {
                onChangeHtml(editor.getData());
            }}
        />
    );
}
