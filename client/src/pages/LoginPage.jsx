import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, MessageSquare, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoggingIn } = useAuthStore();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div>
      <div className="min-h-screen m-auto">
        <div className="flex flex-col  bg-slate-200  m-auto  w-[45%] rounded-md justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <h1 className="text-2xl font-bold mt-2">Login Account</h1>
                <p className="text-base-content/60">
                  Get started with  account
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
             
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className="input-bordered w-full pl-10 h-12"
                    placeholder="chitteswarancj06@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

           
              <div>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="flex items-center">
                    <Lock className="size-5 mt-4 text-base-content/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-bordered w-full pl-10  h-12"
                      placeholder="Enter your password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <div
                      className="cursor-pointer "
                      onClick={togglePassword}
                    >
                      {showPassword ? (
                        <Eye className="size-5 text-base-content/40" />
                      ) : (
                        <EyeOff className="size-5 text-base-content/40" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn  bg-slate-900 h-12 text-white btn-primary w-full"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Loading' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
