// types/content.ts

export interface Category {
    id: number;
    name: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Content {
    id: number;
    title: string;
    body: string;
    image?: string;
    created_at?: string;

    category?: Category;
    tags?: Tag[];
    author?: {
        id: number;
        name: string;
        avatar?: string;
    };
}
