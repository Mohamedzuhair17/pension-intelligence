import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore, mockUser, createFreshUser } from '@/store/useAppStore';
import { t } from '@/i18n/translations';

export default function LoginPage() {
  const [pran, setPran] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setUser, setAuthenticated, isAuthenticated, language } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => { if (isAuthenticated) navigate('/dashboard'); }, [isAuthenticated, navigate]);

  const validateInputs = (): boolean => {
    setError('');
    if (!pran.trim()) { setError(t('pranRequired', language) || 'PRAN is required'); return false; }
    if (!password) { setError(t('passwordRequired', language) || 'Password is required'); return false; }
    if (password.length < 6) { setError(t('passwordMin', language) || 'Password must be at least 6 characters'); return false; }
    return true;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true); setError('');
    setTimeout(() => {
      try {
        const freshSignup = sessionStorage.getItem('pension-pal-fresh-signup') === '1';
        if (freshSignup) sessionStorage.removeItem('pension-pal-fresh-signup');
        setUser(freshSignup ? createFreshUser() : mockUser);
        setAuthenticated(true);
        setSuccess(true);
        setPran('');
        setPassword('');
      }
      catch (err) { setError(t('loginFailed', language) || 'Login failed. Please try again.'); }
      finally { setLoading(false); }
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-surface)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080C18 0%, #0D1120 40%, rgba(124,58,237,0.12) 100%)' }}>
        <div className="absolute inset-0">
          <div className="floating-orb" style={{ width: 300, height: 300, background: '#7C3AED', top: '10%', left: '20%' }} />
          <div className="floating-orb" style={{ width: 250, height: 250, background: '#3B82F6', bottom: '15%', right: '15%', animationDelay: '3s' }} />
          <div className="floating-orb" style={{ width: 150, height: 150, background: '#14B8A6', top: '60%', left: '10%', animationDelay: '5s' }} />
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8"
            style={{ boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-[var(--text-primary)] mb-4">
            AI-Powered NPS Assistant
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Your intelligent pension companion. Ask questions in your language,
            calculate projections, and manage your NPS account — all in one place.
          </p>
          <div className="flex items-center justify-center gap-6 mt-10 text-[var(--text-muted)] text-sm">
            <span>🔒 Bank-grade Security</span>
            <span>🌐 10+ Languages</span>
            <span>🤖 AI Powered</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gradient">Pension Pal</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">{t('welcomeBackAuth', language)}</h2>
          <p className="text-[var(--text-secondary)] mb-8">{t('signInToAccount', language)}</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl flex items-start gap-3"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }} />
              <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl flex items-start gap-3"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
              <p className="text-sm" style={{ color: '#10B981' }}>{t('loginSuccess', language) || 'Login successful!'}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="pran" className="text-[var(--text-secondary)]">{t('pranAccountNumber', language)}</Label>
              <Input id="pran" placeholder={t('enterPran', language)} value={pran}
                onChange={(e) => { setPran(e.target.value); setError(''); }} className="h-11" disabled={loading} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[var(--text-secondary)]">{t('password', language)}</Label>
                <Link to="/forgot-password" className="text-xs text-pp-purple hover:text-pp-purple-light transition-colors">{t('forgotPassword', language)}</Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder={t('enterPassword', language)} value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }} className="h-11 pr-10" disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-50 transition-colors" disabled={loading}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full h-11 btn-gradient-purple text-sm rounded-xl disabled:opacity-50"
              disabled={loading || !pran.trim() || !password}>
              {loading ? t('signingIn', language) : t('signIn', language)}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
            {t('noAccount', language)}{' '}
            <Link to="/register" className="text-pp-purple font-medium hover:text-pp-purple-light transition-colors">{t('createAccount', language)}</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
