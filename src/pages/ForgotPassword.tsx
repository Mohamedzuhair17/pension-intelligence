import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-gradient">Pension Pal</span>
        </div>

        {!sent ? (
          <>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">Reset your password</h2>
            <p className="text-[var(--text-secondary)] mb-8">Enter your email and we'll send you a reset link</p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[var(--text-secondary)]">Email Address</Label>
                <Input type="email" placeholder="rajesh@example.com" className="h-11" />
              </div>
              <button type="submit" className="w-full h-11 btn-gradient-purple text-sm rounded-xl">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(16,185,129,0.12)' }}>
              <span className="text-3xl">✉️</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">Check your email</h2>
            <p className="text-[var(--text-secondary)]">We've sent a password reset link to your email. The link expires in 24 hours.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
