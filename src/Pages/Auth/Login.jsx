import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login  } = useAuth();
  const location = useLocation;
  const navigate = useNavigate();
  const from = location.state?.from || '/';

   const onSubmit = data => {
    login(data.email, data.password)
        .then(result => {
            console.log(result.user);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome back, ${result.user.email}`,
                timer: 2000,
                showConfirmButton: false
            });
            navigate(from);
        })
        .catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'Something went wrong. Please try again.',
            });
        });
};

  return (
    <div className="w-full max-w-sm p-8 bg-base-200 rounded-2xl shadow-xl space-y-6">
      <ToastContainer /> {/* Toast container here */}
      <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label className="label font-semibold">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 6,
            })}
            className="input input-bordered w-full"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button className="btn btn-neutral btn-block mt-2">Login</button>

        <p className="text-sm text-center">
          New to this website?{' '}
          <Link state={{from}} className="link link-primary" to="/register">
            Register here
          </Link>
        </p>

        <div className="divider">OR</div>

        <SocialLogin />
      </form>
    </div>
  );
};

export default Login;
