import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import logo from "../assets/logorekber.png";
import sideImage from "../assets/side-image.png";
import { loginUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUser(email, password);

      if (!data.isAdmin) {
        alert("Akses ditolak: hanya admin yang dapat login.");
        return;
      }

      login(data.accessToken);
      navigate("/users");
    } catch (error) {
      alert(error?.message || "Login gagal, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md border-0 shadow-xl bg-white/90 backdrop-blur-sm'>
      <CardHeader className='space-y-1 pb-6'>
        <CardTitle className='text-2xl font-bold text-gray-900 text-center'>
          Masuk
        </CardTitle>
        <CardDescription className='text-center text-gray-600'>
          Masukan detail akun Anda untuk mengakses layanan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label
              htmlFor='email'
              className='text-sm font-medium text-gray-700'
            >
              Email *
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='Masukkan username/email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='password'
              className='text-sm font-medium text-gray-700'
            >
              Password *
            </Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? "text" : "password"}
                placeholder='Masukkan password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </button>
            </div>
          </div>

          <Button
            type='submit'
            className='w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium mt-6'
            disabled={isLoading}
          >
            {isLoading ? "Masuk..." : "Masuk"}
          </Button>
        </form>

        <div className='mt-6 text-center'>
          <button className='text-sm text-gray-600 hover:text-gray-800 transition-colors'>
            Lupa Password?{" "}
            <span className='text-blue-600 hover:text-blue-800 font-medium'>
              Hubungi Administrator
            </span>
          </button>
        </div>

        <div className='mt-8 text-center'>
          <div className='mt-8 items-center justify-center flex'>
            <img
              className='w-40 h-auto object-contain max-w-full max-h-full'
              alt='Logo Rekber'
              src={logo}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Halaman Login Utama
const Login = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='hidden lg:block'>
        <img
          src={sideImage}
          alt='Side Illustration'
          className='w-full h-screen object-cover'
        />
      </div>

      <div className='flex items-center justify-center p-8 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
