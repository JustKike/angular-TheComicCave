export interface Usuario {
    name: string;
    email: string;
    password: string;
    birthDate?: string;
    uid?: string;
    status?: 'default' | 'admin',
    photo?: any;
}