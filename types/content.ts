export type Category = {
    id: number;
    name: string;
};

export type Tag = {
    id: number;
    name: string;
};


export type Content = {
    id: number;
    title: string;
    body?: string;
    image?: string;
    category_id?: number;
    category?: Category;
    tags?: Tag[];
    created_at?: string;
};