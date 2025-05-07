import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { AtSign, KeyRound, Fingerprint } from 'lucide-react';
import FaceScanner from '../components/FaceScanner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFaceScanner, setShowFaceScanner] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        setShowFaceScanner(true);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceVerification = () => {
    toast.success('Face verification successful');
    
    
    const userRole = email.includes('admin') ? 'admin' : 'employee';
    navigate(userRole === 'admin' ? '/admin' : '/employee');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {!showFaceScanner ? (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-all duration-300">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    transition-colors duration-200
                  `}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Fingerprint size={18} className="mr-2" />
                  )}
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Demo accounts: <br />
                <span className="font-medium">admin@example.com / admin123</span> <br />
                {/* <span className="font-medium">john@example.com / password123</span> */}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 transition-all duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Face Verification</h2>
              <p className="text-gray-600">Please look at the camera for verification</p>
            </div>
            
            <FaceScanner 
              onCapture={handleFaceVerification}
              buttonText="Verify My Face"
            />
            
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowFaceScanner(false)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Back to login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;