import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brain, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';


const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log( API_BASE_URL);

// Define schema for form validation
const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  matricula: z.string().min(1, 'Matricula is required') // <-- nuevo campo
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  matricula: string; // <-- nuevo campo
};

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password', '');
  
  const passwordStrength = {
    hasLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password)
  };
  
  const getPasswordStrengthScore = () => {
    return Object.values(passwordStrength).filter(Boolean).length;
  };
  
  const score = getPasswordStrengthScore();
  
  const getStrengthColor = () => {
    if (score <= 2) return 'bg-error';
    if (score <= 4) return 'bg-warning';
    return 'bg-success';
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.firstName,
          apellido: data.lastName,
          matricula: data.matricula // <-- aquí lo envías
        })
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/dashboard');
      } else {
        alert(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-primary-light/30 flex items-center justify-center">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First name"
                  type="text"
                  id="firstName"
                  autoComplete="given-name"
                  placeholder="John"
                  error={errors.firstName?.message}
                  {...register('firstName')}
                />
                
                <Input
                  label="Last name"
                  type="text"
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Doe"
                  error={errors.lastName?.message}
                  {...register('lastName')}
                />
              </div>
              
              <Input
                label="Email address"
                type="email"
                id="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex space-x-1 h-1">
                    <div className={`flex-1 rounded-l ${score >= 1 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                    <div className={`flex-1 ${score >= 2 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                    <div className={`flex-1 ${score >= 3 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                    <div className={`flex-1 ${score >= 4 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                    <div className={`flex-1 rounded-r ${score >= 5 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      <CheckCircle2 className={`h-3.5 w-3.5 mr-1 ${passwordStrength.hasLength ? 'text-success' : 'text-gray-300'}`} />
                      <span className={passwordStrength.hasLength ? 'text-gray-700' : 'text-gray-400'}>8+ characters</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className={`h-3.5 w-3.5 mr-1 ${passwordStrength.hasUppercase ? 'text-success' : 'text-gray-300'}`} />
                      <span className={passwordStrength.hasUppercase ? 'text-gray-700' : 'text-gray-400'}>Uppercase</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className={`h-3.5 w-3.5 mr-1 ${passwordStrength.hasLowercase ? 'text-success' : 'text-gray-300'}`} />
                      <span className={passwordStrength.hasLowercase ? 'text-gray-700' : 'text-gray-400'}>Lowercase</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className={`h-3.5 w-3.5 mr-1 ${passwordStrength.hasNumber ? 'text-success' : 'text-gray-300'}`} />
                      <span className={passwordStrength.hasNumber ? 'text-gray-700' : 'text-gray-400'}>Number</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <CheckCircle2 className={`h-3.5 w-3.5 mr-1 ${passwordStrength.hasSpecial ? 'text-success' : 'text-gray-300'}`} />
                      <span className={passwordStrength.hasSpecial ? 'text-gray-700' : 'text-gray-400'}>Special character</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="relative">
                <Input
                  label="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              <Input
                label="Matricula"
                type="text"
                id="matricula"
                placeholder="1234"
                error={errors.matricula?.message}
                {...register('matricula')}
              />
              
              <div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:text-primary-dark">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary hover:text-primary-dark">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                Create account
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;