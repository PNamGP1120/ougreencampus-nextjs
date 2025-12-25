export type Role = "admin" | "organizer" | "student";
export type UserStatus = "active" | "inactive";

export type User = {
    id: number;
    email: string;
    name: string;
    avatar?: string;
    role: Role;
    status: UserStatus;
    created_at?: string;
    updated_at?: string;
};

export type LoginResult = {
    token: string;
    user: User;
};
