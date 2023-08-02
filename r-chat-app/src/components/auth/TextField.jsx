import React from 'react';
import classNames from "classnames";
import Error from "./Error";


const TextField = ({
  fieldState, setFieldState,
  placeholder, icon, error,
  isPassword, maxLength
}) => {

  const bgClasses = classNames(
    'flex items-center py-1.5 pl-3 pr-2',
    'rounded-md bg-[#282828] border-2 border-[#3E3E3E]',
    'hover:drop-shadow-xl hover:border-blue-39 duration-150'
  );
  const textClasses = 'text-platinum-e8 placeholder-[#A0A0A0]';

  return (
    <div>
      <div className={bgClasses}>
        <input
          className={classNames('w-full outline-none bg-transparent', textClasses)}
          type={isPassword ? 'password' : 'text'}
          placeholder={placeholder || 'type value...'}
          maxLength={maxLength || 10}
          value={fieldState}
          onChange={event => setFieldState(event.target.value)}
        />
        {icon && icon({size: 22, color: '#3E3E3E'})}
      </div>
      {error && <Error text={error}/>}
    </div>
  );
};

export default TextField;