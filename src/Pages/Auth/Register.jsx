import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    const location = useLocation;
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const [profilePic, setProfilePic] = useState('');
  const axiosInstance = useAxios();

  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    createUser(data.email, data.password)
      .then( async(result) => {
        toast.success('Registration successful!');
        console.log('User:', result.user);
        console.log('Extra Info:', {
          name: data.name,
          photo: data.photo,
          role: data.role,
        });

        // update userinfo in the database
        const userInfo = {
          email: data.email,
          role: 'user', // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
          .then(() => {
            console.log('profile name pic updated');
            navigate(from);
          })
          .catch(error => {
            console.log(error)
          })


      })
      .catch((error) => {
        toast.error(error.message || 'Registration failed!');
        console.error(error);
      });
  };





  const handleImageupload = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData();
    formData.append('image', image);
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    const res = await axios.post(imagUploadUrl, formData)
    setProfilePic(res.data.data.url);
  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <ToastContainer />
      <div className="card bg-base-200 w-full max-w-md shadow-2xl p-6">
        <div className="card-body space-y-4">
          <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label font-semibold">Full Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered w-full"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            <div>
              <label className="label font-semibold">Photo URL</label>
              <input
                type="file"
                onChange={handleImageupload}
                className="input input-bordered w-full"
                placeholder="Link to your profile photo"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">Photo URL is required</p>
              )}
            </div>

            <div>
              <label className="label font-semibold">Role</label>
              <select
                {...register('role')}
                defaultValue="student"
                className="select select-bordered w-full"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <div>
              <label className="label font-semibold">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword', { required: true })}
                className="input input-bordered w-full"
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Please confirm your password
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>

            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link className="link link-primary" to="/login">
                Login
              </Link>
            </p>
          </form>

          <div className="divider">or</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
