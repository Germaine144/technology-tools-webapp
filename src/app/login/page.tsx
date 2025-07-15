'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [firstname, setFirstname] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOtpError('');

    if (!firstname.trim() || !email.trim() || !password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        firstname: firstname.trim(),
        email: email.trim().toLowerCase(),
        password: password
      };

      console.log('Requesting OTP with payload:', payload);

      const otpResponse = await axios.post(
        'https://e-tech-store-6d7o.onrender.com/api/auth/signin/request-otp',
        payload,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log('OTP request response:', otpResponse.data);

      if (otpResponse.data.success || otpResponse.data.message === "OTP sent to your email.") {
        setShowOtp(true);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err: any) {
      console.error('OTP Request Error:', err);
      console.error('Error response:', err.response?.data);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 404) {
        setError('User not found. Please check your credentials.');
      } else if (err.response?.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP code");
      return;
    }

    setOtpError("");
    setLoading(true);

    try {
      const payloadOptions = [
        {
          email: email.trim().toLowerCase(),
          otp: otp
        },
        {
          email: email.trim().toLowerCase(),
          otp: parseInt(otp, 10)
        }
      ];

      let response;
      let lastError;

      for (let i = 0; i < payloadOptions.length; i++) {
        try {
          console.log(`Trying OTP verification with payload ${i + 1}:`, payloadOptions[i]);

          response = await axios.post(
            'https://e-tech-store-6d7o.onrender.com/api/auth/signin/verify-otp',
            payloadOptions[i],
            {
              headers: { 'Content-Type': 'application/json' }
            }
          );

          console.log('OTP verification response:', response.data);
          break;
        } catch (tempErr: any) {
          lastError = tempErr;
          console.error(`Payload ${i + 1} failed:`, tempErr.response?.data);

          if (tempErr.response?.status !== 400) {
            break;
          }
        }
      }

      // FIX 1: Check for successful login message instead of just token
      if (response && (response.data.token || response.data.message?.includes('Login successful') || response.data.message?.includes('Welcome back'))) {
        // Store token if available
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        
        // Store user data if available
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        } else if (response.data.id) {
          // If user data is directly in response.data
          const userData = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            roles: response.data.roles
          };
          localStorage.setItem('user', JSON.stringify(userData));
        }

        setSuccessMessage("Login successful!");
        setTimeout(() => {
          router.push(redirect || "/");
        }, 1000);
      } else if (response) {
        setOtpError(response.data.message || "Invalid OTP. Please try again.");
      } else {
        throw lastError;
      }
    } catch (err: any) {
      console.error('OTP Verification Error:', err);
      console.error('Error response:', err.response?.data);

      if (err.response?.data?.message) {
        setOtpError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setOtpError("Invalid or expired OTP. Please request a new one.");
      } else if (err.response?.status === 404) {
        setOtpError("OTP verification service not found. Please contact support.");
      } else if (err.response?.status === 429) {
        setOtpError("Too many attempts. Please wait before trying again.");
      } else {
        setOtpError("Failed to verify OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setOtpError('');

    try {
      const response = await axios.post(
        'https://e-tech-store-6d7o.onrender.com/api/auth/signin/request-otp',
        {
          firstname: firstname.trim(),
          email: email.trim().toLowerCase(),
          password: password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log('Resend OTP response:', response.data);

      if (response.data.success || response.data.message === 'OTP sent to your email.') {
        setOtpError('New OTP sent successfully!');
        setTimeout(() => setOtpError(''), 3000);
      } else {
        setOtpError('Failed to resend OTP. Please try again.');
      }
    } catch (err: any) {
      console.error('Resend OTP Error:', err);
      console.error('Error response:', err.response?.data);

      if (err.response?.data?.message) {
        setOtpError(err.response.data.message);
      } else {
        setOtpError('Failed to resend OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="sm:mx-auto w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-2xl">▽</span>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {showOtp ? 'Verify OTP' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {showOtp ? 'Enter the code sent to your email' : 'Sign in to your account to continue'}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-2xl rounded-2xl border border-white/20">
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center justify-center">
              <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-700 font-medium">{successMessage}</span>
            </div>
          )}
          {!showOtp ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-shake">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white/70 backdrop-blur-sm"
                      placeholder="Enter your first name"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white/70 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white/70 backdrop-blur-sm"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Your Identity</h3>
              <p className="text-gray-600 text-sm">We've sent a verification code to your email</p>
              <p className="text-indigo-600 text-sm font-medium mt-1">{email}</p>
              
              <form className="space-y-6 mt-6" onSubmit={handleOtpSubmit}>
                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter 6-digit code
                  </label>
                  <div className="relative">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg font-mono tracking-widest bg-white/70 backdrop-blur-sm transition-colors duration-200"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="123456"
                    />
                  </div>
                </div>
                
                {otpError && (
                  <div className={`${otpError.includes('successfully') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-4 animate-shake`}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className={`h-5 w-5 ${otpError.includes('successfully') ? 'text-green-500' : 'text-red-500'}`} viewBox="0 0 20 20" fill="currentColor">
                          {otpError.includes('successfully') ? (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          )}
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm ${otpError.includes('successfully') ? 'text-green-700' : 'text-red-700'} font-medium`}>{otpError}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </div>
                    ) : (
                      'Verify & Continue'
                    )}
                  </button>
                </div>
                
                <div className="text-center space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtp(false);
                      setError("");
                      setOtpError("");
                      setOtp("");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                  >
                    ← Back to login
                  </button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200 disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {!showOtp && (
            <>
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <FcGoogle className="w-5 h-5 mr-3" />
                    Sign in with Google
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                    Create account
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;