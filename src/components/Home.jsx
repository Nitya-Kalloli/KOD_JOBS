import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputStyles = "w-72 p-2 rounded-lg bg-slate-800/50 border border-slate-600 focus:border-slate-400 outline-none transition-colors duration-300 text-sm placeholder:text-slate-500";
const buttonStyles = "w-72 p-2 rounded-lg font-semibold transition-all duration-300 text-sm";

const Home = () => {
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    password: '',
    dob: '',
    email: ''
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '{"users": []}');
    const user = users.users.find(u => u.name === loginData.name && u.password === loginData.password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!signupData.name || !signupData.password || !signupData.dob || !signupData.email) {
      alert("Please fill all fields");
      return;
    }

    // Validate email format
    if (!validateEmail(signupData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate password strength
    if (!validatePassword(signupData.password)) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Validate age
    if (!validateAge(signupData.dob)) {
      alert("You must be 18 or older to register");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '{"users": []}');
      
      // Check for duplicate username
      if (users.users.some(user => user.name === signupData.name)) {
        alert("Username already exists. Please choose another one.");
        return;
      }

      // Check for duplicate email
      if (users.users.some(user => user.email === signupData.email)) {
        alert("Email already registered. Please use another email.");
        return;
      }

      const newUser = {
        name: signupData.name,
        password: signupData.password,
        dob: signupData.dob,
        email: signupData.email,
        id: Date.now()
      };
      users.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      alert('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Failed to create account');
    }
  };

  // Handle Enter key for login and signup
  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') {
      handler(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1f2e] p-6">
      {/* Welcome Text */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to KOD JOBS</h1>
        <p className="text-gray-400">Your Gateway to Career Opportunities</p>
      </div>

      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Find Your Dream Job
                </h2>
                <p className="text-lg text-black">
                  Connect with top companies and opportunities tailored for you
                </p>
              </div>
              <img 
                src="/woman-laptop.png"
                alt="Woman working"
                className="rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=Welcome';
                }}
              />
            </div>
          </div>
          
          {/* Right Side - Forms */}
          <div className="space-y-8 bg-[#1e2536] p-8 rounded-xl">
            {/* Login Form */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white text-center">Login</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full p-2 rounded-lg bg-[#272e42] border border-[#374151] focus:border-blue-500 outline-none text-white text-sm"
                  value={loginData.name}
                  onChange={(e) => setLoginData({...loginData, name: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                />
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-2 rounded-lg bg-[#272e42] border border-[#374151] focus:border-blue-500 outline-none text-white text-sm"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showLoginPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                <button 
                  onClick={handleLogin} 
                  className="w-full p-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Signup Form */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white text-center">Sign Up</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full p-2 rounded-lg bg-[#272e42] border border-[#374151] focus:border-blue-500 outline-none text-white text-sm"
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                />
                <div className="relative">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Create a password (min. 6 characters)"
                    className="w-full p-2 rounded-lg bg-[#272e42] border border-[#374151] focus:border-blue-500 outline-none text-white text-sm"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showSignupPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                <input
                  type="date"
                  placeholder="Date of birth"
                  className="w-full p-2 rounded-lg bg-[#272e42] border border-[#374151] focus:border-blue-500 outline-none text-white text-sm"
                  value={signupData.dob}
                  onChange={(e) => setSignupData({...signupData, dob: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-lg bg-[#272e42] border border-[#374151] focus:border-blue-500 outline-none text-white text-sm"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                />
                <button 
                  onClick={handleSignup} 
                  className="w-full p-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 