export interface Usuario {
    displayName: string;
    email: string;
    password: string;
    birthDate?: string;
    uid?: string;
    status?: 'default' | 'admin',
    photoURL?: any;
}