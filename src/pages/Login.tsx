import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore, mockUser } from '@/store/useAppStore';
import { t } from '@/i18n/translations';

export default function LoginPage() {
  const [pran, setPran] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser, setAuthenticated, language } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser(mockUser);
      setAuthenticated(true);
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-saffron blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-sky blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-lg text-center">
          <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            AI-Powered NPS Assistant
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Your intelligent pension companion. Ask questions in your language,
            calculate projections, and manage your NPS account — all in one place.
          </p>
          <div className="flex items-center justify-center gap-6 mt-10 text-primary-foreground/50 text-sm">
            <span>🔒 Bank-grade Security</span>
            <span>🌐 10+ Languages</span>
            <span>🤖 AI Powered</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">NPS Assistant</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-1">{t('welcomeBackAuth', language)}</h2>
          <p className="text-muted-foreground mb-8">{t('signInToAccount', language)}</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="pran">{t('pranAccountNumber', language)}</Label>
              <Input
                id="pran"
                placeholder={t('enterPran', language)}
                value={pran}
                onChange={(e) => setPran(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('password', language)}</Label>
                <Link to="/forgot-password" className="text-xs text-accent hover:underline">
                  {t('forgotPassword', language)}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('enterPassword', language)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-semibold" disabled={loading}>
              {loading ? t('signingIn', language) : t('signIn', language)}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t('noAccount', language)}{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">
              {t('createAccount', language)}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
