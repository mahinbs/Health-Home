import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success';
    isLoading?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'info',
    isLoading = false
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    const variantConfig = {
        danger: {
            icon: AlertCircle,
            iconColor: 'text-red-600',
            iconBg: 'bg-red-50',
            buttonClass: 'bg-red-600 hover:bg-red-700 text-white'
        },
        warning: {
            icon: AlertCircle,
            iconColor: 'text-orange-600',
            iconBg: 'bg-orange-50',
            buttonClass: 'bg-orange-600 hover:bg-orange-700 text-white'
        },
        info: {
            icon: Info,
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-50',
            buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white'
        },
        success: {
            icon: CheckCircle,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-50',
            buttonClass: 'bg-green-600 hover:bg-green-700 text-white'
        }
    };

    const config = variantConfig[variant];
    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${config.iconBg} flex-shrink-0`}>
                            <Icon className={config.iconColor} size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm">{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                            disabled={isLoading}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                            disabled={isLoading}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className={`flex-1 ${config.buttonClass}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
