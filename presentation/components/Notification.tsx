import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';

const Notification: React.FC = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const styles = {
    success: { container: 'bg-white border-primary/20', icon: 'bg-primary/10 text-primary' },
    info: { container: 'bg-gray-900 border-white/10 text-white', icon: 'bg-white/10 text-white' },
    error: { container: 'bg-white border-red-200', icon: 'bg-red-50 text-red-500' },
  };

  const style = styles[notification.type];

  return (
    <div className="fixed top-28 right-8 z-[200] animate-slide-up">
      <div className={`flex items-center gap-4 px-6 py-4 rounded-3xl shadow-2xl border ${style.container}`}>
        <div className={`size-10 rounded-2xl flex items-center justify-center ${style.icon}`}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
        </div>
        <p className="text-sm font-black font-display">{notification.message}</p>
      </div>
    </div>
  );
};

export default Notification;
