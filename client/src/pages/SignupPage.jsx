import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, Mail, MessageSquare, User, Lock, EyeOff, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const { signup, isSigninUp } = useAuthStore();

  const validateForm = () => {
    const { username, email, password, address, phone } = formData;
    if (!username || !email || !password || !address || !phone) {
      toast.error("All fields are required");
      return false;
    }
   
    return true;
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="h-auto  m-auto">
      <div className="flex flex-col p-2  bg-slate-200  w-[45%] m-auto rounded-md justify-center  mt-4 items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input-bordered w-full pl-10 h-12"
                  placeholder="chitteswaran j"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            
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
                  required
                />
              </div>
            </div>

           
            <div>
              <label className="label">
                <span className="label-text font-medium">Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input-bordered w-full pl-10 h-12"
                  placeholder="Namakkal,India"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="size-5 text-base-content/40" />
                </div>
                <input
                  type="tel"
                  className="input-bordered w-full pl-10 h-12"
                  placeholder="+91 9003411556"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-bordered w-full pl-10 h-12"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
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

          
            <button
              type="submit"
              className="btn bg-slate-900 text-white h-12 btn-primary w-full"
              disabled={isSigninUp}
            >
              {isSigninUp ? "Loading" : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
