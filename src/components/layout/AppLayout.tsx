import { Outlet, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { useAppStore } from '@/store/useAppStore';

export default function AppLayout() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <AppSidebar />
      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex flex-col min-h-screen"
      >
        <AppHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={undefined}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  );
}
