import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role: string) => void;
    logout: () => void;
    updateVerificationStatus: (status: User['verificationStatus']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email: string, roleId: string) => {
        // Map login role IDs to UserRole enum
        const roleMapping: Record<string, UserRole> = {
            'admin': UserRole.ADMIN,
            'doctor': UserRole.DOCTOR,
            'medical-officer': UserRole.MEDICAL_OFFICER,
            'nurse': UserRole.NURSE,
            'physiotherapist': UserRole.PHYSIOTHERAPIST,
            'caretaker': UserRole.CARETAKER,
            'pharmacy': UserRole.PHARMACY,
            'laboratory': UserRole.LABORATORY,
            'hospital': UserRole.HOSPITAL
        };

        const newUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            role: roleMapping[roleId] || UserRole.DOCTOR,
            verificationStatus: 'pending' // Default to pending for simulation, only admin can approve
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const updateVerificationStatus = (status: User['verificationStatus']) => {
        if (user) {
            const updatedUser = { ...user, verificationStatus: status };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateVerificationStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
