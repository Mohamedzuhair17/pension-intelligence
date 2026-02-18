import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      setLoading(false);
      navigate('/login');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">NPS Assistant</span>
        </div>

        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Create your account</h2>
        <p className="text-muted-foreground mb-8">Join thousands of NPS subscribers using AI assistance</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Rajesh Kumar" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="+91 98765 43210" className="h-11" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input type="email" placeholder="rajesh@example.com" className="h-11" />
          </div>

          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input type="date" className="h-11" />
          </div>

          <div className="space-y-2">
            <Label>NPS Account Number (PRAN)</Label>
            <Input placeholder="12-digit PRAN (optional)" className="h-11" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Min. 12 characters" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Confirm" className="h-11" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                I agree to the <span className="text-accent cursor-pointer">Terms & Conditions</span> and <span className="text-accent cursor-pointer">Privacy Policy</span>
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-semibold mt-2" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
