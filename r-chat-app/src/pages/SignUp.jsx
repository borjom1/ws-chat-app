import React, {useEffect, useState} from 'react';
import TextField from "../components/auth/TextField";
import {BsPerson} from 'react-icons/bs';
import {AiOutlinePushpin} from 'react-icons/ai';
import {RiLockPasswordLine} from 'react-icons/ri';
import Button from "../components/Button";
import {PiHandFistBold} from "react-icons/pi";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../store/slice/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setUser} from "../utils/localStorage";
import Error from "../components/auth/Error";
import InfiniteLoading from "../components/InfiniteLoading";
import {clearState} from '../store/slice/authSlice';

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const response = useSelector(state => state.auth.data);
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    dispatch(clearState());
  }, []);

  useEffect(() => {

    if (getUser()) {
      navigate('/');
    } else if (response) { // if we accepted 200
      setUser(response);
      navigate('/');
    }

  }, [response]);

  const handleClick = () => {

    // field validation
    const errors = {};

    if (name.length < 3 || name.length > 15) {
      errors.name = 'length should be within 3 and 15';
    }
    if (login.length < 3 || login.length > 15) {
      errors.login = 'length should be within 3 and 15';
    }
    if (password !== confirmPassword) {
      errors.passwords = 'passwords do not match';
    } else if (password.length < 6 || password.length > 20) {
      errors.passwords = 'length should be within 6 and 20';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length) { // if we have some errors
      return;
    }

    const credentials = {
      name,
      login,
      password
    };

    dispatch(register(credentials)); // make api request
  };

  return (
    isLoading ?
      <InfiniteLoading/> :
      <div className='w-full h-[100vh] flex flex-col gap-3 justify-center items-center'>
        {error &&
          <div className='w-[35%]'>
            <Error
              text={error.data.error}
              center
              border
            />
          </div>
        }
        <div className='w-[35%] bg-eerie-black-f rounded-xl'>
          <p className='text-platinum-e8 text-lg font-medium mx-auto w-max mt-8'>CREATE AN ACCOUNT</p>
          <div className='flex flex-col gap-8 w-3/5 mx-auto mt-8'>
            <TextField
              placeholder='Name'
              icon={BsPerson}
              maxLength={15}
              fieldState={name}
              setFieldState={setName}
              error={fieldErrors.name}
            />
            <TextField
              placeholder='Login'
              icon={AiOutlinePushpin}
              maxLength={15}
              fieldState={login}
              setFieldState={setLogin}
              error={fieldErrors.login}
            />
            <TextField
              placeholder='Password'
              icon={RiLockPasswordLine}
              isPassword
              maxLength={20}
              fieldState={password}
              setFieldState={setPassword}
              error={fieldErrors.passwords}
            />
            <TextField
              placeholder='Confirm password'
              icon={RiLockPasswordLine}
              isPassword
              maxLength={20}
              fieldState={confirmPassword}
              setFieldState={setConfirmPassword}
              error={fieldErrors.passwords}
            />
          </div>
          <Button
            bgClassName={'w-[60%] mx-auto mt-6 px-2 py-2 hover:bg-[#2B4071]'}
            icon={<PiHandFistBold size={20} color='#DBDBDB'/>}
            bgColor={'blue-39'}
            label={'Sign Up'}
            onClick={handleClick}
          />
          <div className='w-max flex gap-1 items-center mx-auto my-6'>
            <p className='text-silver-bf text-sm'>Have an account?</p>
            <Link to={'/sign_in'}>
              <span className='text-sm text-[#4466BA] font-medium'>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default SignUp;