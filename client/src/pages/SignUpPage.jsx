import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlServer } from '../utils/urlServer';
import { toast } from 'react-toastify';
import { validRegister } from '../utils/validationRegister';
import OAuth from '../components/OAuth';
const SignUpPage = () => {
  const [userForm, setUserForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const handleInput = (e) => {
    setUserForm({
      ...userForm,
      [e.target.id]: e.target.value,
    });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage();
      const error = validRegister(userForm);
      if (error.errLength > 0) {
        setErrorMessage(error.err);
        return;
      }
      setLoading(true);

      const res = await fetch(`${urlServer}/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userForm),
      });
      setLoading(false);
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        navigate('/sign-in');
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log(errorMessage);
  return (
    <div className="pt-[120px]  px-3 height">
      <div className="container max-w-xl w-full mx-auto p-3">
        <h1 className="text-center font-semibold text-2xl mb-5">Sign Up</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSumbit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="username"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-slate-500"
              onChange={handleInput}
              value={userForm?.username || ''}
            />
            {errorMessage?.username && (
              <p className="text-sm text-red-500 px-3">
                {errorMessage?.username}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-slate-500"
              onChange={handleInput}
              value={userForm?.email || ''}
            />
            {errorMessage?.email && (
              <p className="text-sm text-red-500 px-3">{errorMessage?.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="*********"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-slate-500"
              value={userForm?.password || ''}
              onChange={handleInput}
            />
            {errorMessage?.password && (
              <p className="text-sm text-red-500 px-3">
                {errorMessage?.password}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 border bg-slate-500 text-xl font-semibold mb-3 rounded-md text-white transition-all duration-300 hover:bg-transparent hover:border-slate-500 hover:text-slate-500"
              disabled={loading}
            >
              Sign Up
            </button>
            <OAuth />
          </div>
        </form>
        <p className="text-lg text-gray-600">
          If you have an account, please{' '}
          <Link
            to="/sign-in"
            className="mr-1 text-sm text-teal-500 hover:underline"
          >
            sign in.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
