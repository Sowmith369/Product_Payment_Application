import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const error = new Error(data.message || 'Login failed');
        throw error;
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      throw error; // Re-throw the error to be caught by the component
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};