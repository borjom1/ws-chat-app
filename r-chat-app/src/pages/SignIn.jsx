import React, {useEffect, useState} from 'react';
import TextField from "../components/auth/TextField";
import {AiOutlinePushpin} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import {PiHandFistBold} from "react-icons/pi";
import Button from "../components/Button";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUser, setUser} from "../utils/localStorage";
import {clearState, login as loginQuery} from "../store/slice/authSlice";
import Error from "../components/auth/Error";
import InfiniteLoading from "../components/InfiniteLoading";

const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const response = useSelector(state => state.auth.data);
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
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

    if (login.length < 3 || login.length > 15) {
      errors.login = 'length should be within 3 and 15';
    }
    if (password.length < 6 || password.length > 20) {
      errors.password = 'length should be within 6 and 20';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length) { // if we have some errors
      return;
    }

    dispatch(loginQuery({login, password})); // make api request
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
        <div className='w-[35%] bg-eerie-black-f rounded-xl '>
          <p className='text-platinum-e8 text-lg font-medium mx-auto w-max mt-8'>LOG IN ACCOUNT</p>
          <div className='flex flex-col gap-8 w-[60%] mx-auto mt-8'>
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
              error={fieldErrors.password}
            />
          </div>
          <Button
            bgClassName={'w-full mx-auto mt-6 px-2 py-2 hover:bg-[#2B4071]'}
            icon={<PiHandFistBold size={20} color='#DBDBDB'/>}
            bgColor={'blue-39'}
            label={'Sign In'}
            onClick={handleClick}
          />
          <div className='w-max flex gap-1 items-center mx-auto my-6'>
            <p className='text-silver-bf text-sm'>Do not have an account?</p>
            <Link to={'/sign_up'}>
              <span className='text-sm text-[#4466BA] font-medium'>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default SignIn;