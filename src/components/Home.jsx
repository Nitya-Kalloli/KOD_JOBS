import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../users.json';

const inputStyles = "w-72 p-2 rounded-lg bg-slate-800/50 border border-slate-600 focus:border-slate-400 outline-none transition-colors duration-300 text-sm placeholder:text-slate-500";
const buttonStyles = "w-72 p-2 rounded-lg font-semibold transition-all duration-300 text-sm";

const backgroundStyle = {
  backgroundImage: `
    linear-gradient(to bottom right, rgba(15, 23, 42, 0.97), rgba(30, 41, 59, 0.97)),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
  `,
  backgroundSize: '600px 600px',
  backgroundPosition: 'center',
};

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

  // Handle Enter key for login
  const handleLoginKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  // Handle Enter key for signup
  const handleSignupKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup(e);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '{"users": []}');
    const user = users.users.find(u => u.name === loginData.name && u.password === loginData.password);
    
    if (user) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (!signupData.name.trim() || !signupData.password || !signupData.dob || !signupData.email) {
      alert("Please fill all fields");
      return;
    }

    // Calculate age
    const birthDate = new Date(signupData.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '{"users": []}');
    
    // Check if username already exists
    if (existingUsers.users.some(user => user.name === signupData.name)) {
      alert("Username already exists!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: signupData.name,
      password: signupData.password,
      dob: signupData.dob,
      age,
      email: signupData.email
    };

    // Add new user to array
    existingUsers.users.push(newUser);
    
    // Save to localStorage
    try {
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen text-white" style={backgroundStyle}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-6 mb-8 shadow-lg max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-slate-200 text-center font-bold">
            Welcome to KOD JOBS
          </h1>
          <p className="text-center text-slate-400 mt-2 text-sm">
            Your Gateway to Career Opportunities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Image */}
          <div className="hidden md:block h-full">
            <div className="relative h-[600px] flex flex-col justify-center">
              <div className="absolute -inset-1 bg-slate-500/10 rounded-lg blur"></div>
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 p-6 rounded-t-lg z-10">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Find Your Dream Job
                </h2>
                <p className="text-lg text-black">
                  Connect with top companies and opportunities tailored for you
                </p>
              </div>
              <img 
                src="./woman-laptop.png"
                alt="Woman working"
                className="relative rounded-lg shadow-2xl transform hover:scale-[1.01] transition-transform duration-300 object-cover h-full w-full"
              />
            </div>
          </div>
          
          {/* Right Side - Forms */}
          <div className="space-y-8 bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-slate-700 h-[600px] flex flex-col justify-center">
            {/* Login Form */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="flex items-center gap-3 w-full">
                <div className="h-px flex-1 bg-slate-700"></div>
                <h2 className="text-xl font-semibold text-slate-200 text-center">
                  Login
                </h2>
                <div className="h-px flex-1 bg-slate-700"></div>
              </div>
              <div className="space-y-3 w-full flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className={inputStyles}
                  value={loginData.name}
                  onChange={(e) => setLoginData({...loginData, name: e.target.value})}
                  onKeyPress={handleLoginKeyPress}
                />
                <div className="relative w-72">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={inputStyles}
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    onKeyPress={handleLoginKeyPress}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
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
                <button onClick={handleLogin} className={buttonStyles}>
                  Login
                </button>
              </div>
            </div>

            {/* Signup Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-700"></div>
                <h2 className="text-xl font-semibold text-slate-200 text-center">
                  Sign Up
                </h2>
                <div className="h-px flex-1 bg-slate-700"></div>
              </div>
              <div className="space-y-3 flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Choose a username"
                  className={inputStyles}
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  onKeyPress={handleSignupKeyPress}
                />
                <div className="relative w-72">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={inputStyles}
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    onKeyPress={handleSignupKeyPress}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
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
                  className={`${inputStyles} text-slate-400`}
                  value={signupData.dob}
                  onChange={(e) => setSignupData({...signupData, dob: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={inputStyles}
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                />
                <button onClick={handleSignup} className={`${buttonStyles} border border-slate-600 text-slate-200 hover:bg-slate-700`}>
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