export enum UserRole {
    ADMIN = 'ADMIN',
    DOCTOR = 'DOCTOR',
    MEDICAL_OFFICER = 'MEDICAL_OFFICER',
    NURSE = 'NURSE',
    PHYSIOTHERAPIST = 'PHYSIOTHERAPIST',
    CARETAKER = 'CARETAKER',
    PHARMACY = 'PHARMACY',
    LABORATORY = 'LABORATORY',
    HOSPITAL = 'HOSPITAL'
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}
