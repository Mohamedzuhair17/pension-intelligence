import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">NPS Assistant</span>
        </div>

        {!sent ? (
          <>
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">Reset your password</h2>
            <p className="text-muted-foreground mb-8">Enter your email and we'll send you a reset link</p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="rajesh@example.com" className="h-11" />
              </div>
              <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-semibold">
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✉️</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Check your email</h2>
            <p className="text-muted-foreground">We've sent a password reset link to your email. The link expires in 24 hours.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
