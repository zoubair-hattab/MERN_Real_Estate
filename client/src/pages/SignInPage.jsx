import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlServer } from '../utils/urlServer';
import { toast } from 'react-toastify';
import { validLogin } from '../utils/validationRegister';
import {
  RequsetSingInFail,
  RequsetSingInStart,
  RequsetSingInSuccess,
} from '../redux/reducers/auth.reducers';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
const SignInPage = () => {
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  console.log(loading);
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
      const error = validLogin(userForm);
      if (error.errLength > 0) {
        setErrorMessage(error.err);
        return;
      }
      dispatch(RequsetSingInStart());

      const res = await fetch(`${urlServer}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userForm),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(RequsetSingInSuccess(data.message));
        navigate('/');
      } else {
        toast.error(data.message);
        dispatch(RequsetSingInFail(data.message));
      }
    } catch (error) {
      dispatch(RequsetSingInFail(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div className="pt-[120px]  px-3 height">
      <div className="container max-w-xl w-full mx-auto p-3">
        <h1 className="text-center font-semibold text-2xl mb-5">Sign Up</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSumbit}>
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
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <OAuth />
          </div>
        </form>
        <p className="text-lg text-gray-600">
          If you don't have an account, please
          <Link
            to="/sign-up"
            className="mr-1 text-sm text-teal-500 hover:underline"
          >
            sign up.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
