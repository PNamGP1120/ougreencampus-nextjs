export interface ContentAuthor {
    id: number;
    name: string;
}

export interface ContentCategory {
    id: number;
    name: string;
}

export interface ContentTag {
    id: number;
    name: string;
}

export interface Content {
    id: number;
    title: string;
    body?: string;        // ✅ BẮT BUỘC optional
    image?: string;
    created_at?: string;

    author?: ContentAuthor;
    category?: ContentCategory;
    tags?: ContentTag[];
}
