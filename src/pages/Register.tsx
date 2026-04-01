import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('pension-pal-fresh-signup', '1');
      setLoading(false);
      navigate('/login');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-gradient">Pension Pal</span>
        </div>

        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">Create your account</h2>
        <p className="text-[var(--text-secondary)] mb-8">Join thousands of NPS subscribers using AI assistance</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-[var(--text-secondary)]">Full Name</Label><Input placeholder="Rajesh Kumar" className="h-11" /></div>
            <div className="space-y-2"><Label className="text-[var(--text-secondary)]">Phone Number</Label><Input placeholder="+91 98765 43210" className="h-11" /></div>
          </div>
          <div className="space-y-2"><Label className="text-[var(--text-secondary)]">Email Address</Label><Input type="email" placeholder="rajesh@example.com" className="h-11" /></div>
          <div className="space-y-2"><Label className="text-[var(--text-secondary)]">Date of Birth</Label><Input type="date" className="h-11" /></div>
          <div className="space-y-2"><Label className="text-[var(--text-secondary)]">NPS Account Number (PRAN)</Label><Input placeholder="12-digit PRAN (optional)" className="h-11" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-[var(--text-secondary)]">Password</Label><Input type="password" placeholder="Min. 12 characters" className="h-11" /></div>
            <div className="space-y-2"><Label className="text-[var(--text-secondary)]">Confirm Password</Label><Input type="password" placeholder="Confirm" className="h-11" /></div>
          </div>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" />
              <Label htmlFor="terms" className="text-sm text-[var(--text-secondary)] leading-tight">
                I agree to the <span className="text-pp-purple cursor-pointer hover:text-pp-purple-light transition-colors">Terms & Conditions</span> and <span className="text-pp-purple cursor-pointer hover:text-pp-purple-light transition-colors">Privacy Policy</span>
              </Label>
            </div>
          </div>
          <button type="submit" className="w-full h-11 btn-gradient-purple text-sm rounded-xl disabled:opacity-50 mt-2" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-pp-purple font-medium hover:text-pp-purple-light transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
