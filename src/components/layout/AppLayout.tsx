import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { useAppStore } from '@/store/useAppStore';

export default function AppLayout() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <motion.div
        initial={false}
        animate={{ marginLeft: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex flex-col min-h-screen"
      >
        <AppHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
}
