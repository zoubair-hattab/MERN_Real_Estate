import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { urlServer } from '../utils/urlServer';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../utils/firebase';
import {
  RequsetDeleteStart,
  RequsetSignOutFail,
  RequsetSignOutStart,
  RequsetUpdateFail,
  RequsetUpdateStart,
  RequsetUpdateSuccess,
} from '../redux/reducers/auth.reducers';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const refInput = useRef();
  const [userForm, setUserForm] = useState({});
  const [file, setFile] = useState(null);
  const [errorUpload, setErrorUpload] = useState(false);
  const [updateSucces, setUpdateSucces] = useState(false);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const handleChnageInput = (e) => {
    setUserForm({
      ...userForm,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    if (file) {
      hanfileUpload(file);
    }
  }, [file]);

  const hanfileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      (error) => {
        setErrorUpload(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setUserForm({ ...userForm, userPhoto: downloadURL })
        );
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateSucces(false);

      dispatch(RequsetUpdateStart());
      const res = await fetch(`${urlServer}/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userForm),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(RequsetUpdateSuccess(data.message));
        setUpdateSucces(true);
      } else {
        dispatch(RequsetUpdateFail(data.message));
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(RequsetUpdateFail(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(RequsetSignOutStart());
      const res = await fetch(`${urlServer}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        dispatch(RequsetUpdateSuccess(data.message));
      } else {
        dispatch(RequsetSignOutFail(data.message));
      }
    } catch (error) {
      dispatch(RequsetSignOutFail(error.message));
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(RequsetDeleteStart());
      const res = await fetch(`${urlServer}/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        dispatch(RequsetUpdateSuccess(data.message));
      } else {
        dispatch(RequsetUpdateFail(data.message));
      }
    } catch (error) {
      dispatch(RequsetUpdateFail(error.message));
    }
  };
  return (
    <div className="section max-w-2xl w-full mx-auto px-2">
      <h2 className="text-center font-semibold text-xl mb-4">Profile</h2>
      <form
        className="w-full flex items-center flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <img
          src={userForm.userPhoto || currentUser?.userPhoto}
          alt=""
          className="w-24 h-24 rounded-full object-cover"
          onClick={() => refInput.current.click()}
        />
        {errorUpload && (
          <span className="text-red-700">Error Image Upload</span>
        )}
        {progress && progress > 0 && progress < 100 ? (
          <span className="text-slate-600">{`${progress}%`}</span>
        ) : (
          progress == 100 &&
          !errorUpload && (
            <span className="text-teal-500">Successfully uploaded.</span>
          )
        )}

        <input
          type="file"
          ref={refInput}
          hidden
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
        />
        <input
          type="username"
          placeholder="Username"
          id="username"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-slate-500 "
          defaultValue={currentUser?.username}
          onChange={handleChnageInput}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-slate-500"
          defaultValue={currentUser?.email}
          onChange={handleChnageInput}
        />
        <input
          type="password"
          placeholder="*********"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-slate-500"
          onChange={handleChnageInput}
        />
        <button
          type="submit"
          className="w-full py-2 border bg-slate-500 text-xl font-semibold  rounded-md text-white transition-all duration-300 hover:bg-transparent hover:border-slate-500 hover:text-slate-500"
          disabled={loading}
        >
          {loading ? 'Loading' : 'Update'}
        </button>
        <button
          type="submit"
          className="w-full py-2 border bg-red-500 text-xl font-semibold  rounded-md text-white transition-all duration-300 hover:bg-transparent hover:border-red-500 hover:text-red-500"
        >
          Listing
        </button>
      </form>
      <div className="flex justify-between items-center mt-3">
        <span
          onClick={handleDelete}
          className="text-slate-500 text-sm cursor-pointer hover:underline"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-500 text-sm cursor-pointer hover:underline"
        >
          Sign Out
        </span>
      </div>
      {error && (
        <p className="mx-auto rounded-md text-white w-fit px-2 bg-red-500 py-1">
          {error}
        </p>
      )}
      {updateSucces && (
        <p className="mx-auto rounded-md text-white w-fit px-2 bg-teal-500 py-1">
          User Has been Updated
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
