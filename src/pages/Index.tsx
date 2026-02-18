import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, mockUser } from '@/store/useAppStore';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setUser, setAuthenticated } = useAppStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      // Auto-login for demo purposes
      setUser(mockUser);
      setAuthenticated(true);
      navigate('/dashboard');
    }
  }, []);

  return null;
};

export default Index;
