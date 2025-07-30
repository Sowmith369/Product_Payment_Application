'use client';
import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import toast from 'react-hot-toast';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful!');
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container flex h-screen flex-col items-center justify-center px-4 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full w-full flex-col lg:flex">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1620519185537-4e18c939713f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIzfHxwcm9mZXNzaW9uYWx8ZW58MHx8MHx8fDA%3D)",
          }}
        />
      </div>
      <div className="lg:p-8 w-full">
        <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}


