import React from 'react';
import {BiError} from "react-icons/bi";
import classNames from "classnames";

const Error = ({text, center, border}) => {

  const root = classNames(
    'flex gap-1 items-center mt-1',
    center && 'justify-center',
    border && 'border-2 border-[#7A74CB] py-2 px-3 rounded-lg',
    border && 'hover:bg-eerie-black-f duration-200 cursor-default hover:border-eerie-black-f'
  );

  return (
    <div className={root}>
      <BiError size={14} color={'#7A74CB'}/>
      <span className='text-xs leading-none text-[#7A74CB]'>{text}</span>
    </div>
  );
};

export default Error;