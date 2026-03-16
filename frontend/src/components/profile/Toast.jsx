import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, onClose, duration = 3000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger fade-in
        const showTimer = setTimeout(() => setVisible(true), 10);

        // Auto-dismiss
        const hideTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // wait for fade-out before unmounting
        }, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [duration, onClose]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-xl border ${currentVariant.border} ${currentVariant.bg} px-5 py-3.5 shadow-2xl ${currentVariant.shadow} backdrop-blur-xl transition-all duration-300 ${
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
            }`}
        >
            <div className={`p-1.5 rounded-full ${currentVariant.iconBg}`}>
                <IconComponent size={18} className={`${currentVariant.text} shrink-0`} />
            </div>
            <span className={`text-sm font-medium ${currentVariant.text}`}>{message}</span>
            <button
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="ml-2 rounded-full p-1 text-slate-600 hover:bg-slate-100/50 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-white transition-colors" // Adjusted close button colors
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default Toast;
