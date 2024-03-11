import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../utils/firebase';
import { urlServer } from '../utils/urlServer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  RequsetSingInFail,
  RequsetSingInStart,
  RequsetSingInSuccess,
} from '../redux/reducers/auth.reducers';
const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result?.user;
      dispatch(RequsetSingInStart());
      const res = await fetch(`${urlServer}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: displayName,
          email,
          userPhoto: photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        dispatch(RequsetSingInSuccess(data.message));
        navigate('/profile');
      } else {
        dispatch(RequsetSingInFail(data.message));
      }
    } catch (error) {
      dispatch(RequsetSingInFail(error.message));

      console.log('could not sign with google.', error.message);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="w-full py-2.5 border bg-red-500 text-xl font-semibold mb-3 rounded-md text-white transition-all duration-300 hover:bg-transparent hover:border-red-500 hover:text-red-500"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
