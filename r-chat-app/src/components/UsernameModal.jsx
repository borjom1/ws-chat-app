import classNames from "classnames";
import { useState } from "react";
import { LiaBullhornSolid } from 'react-icons/lia';
import { PiHandFistBold } from 'react-icons/pi';
import Button from "./Button";

const UsernameModal = ({ onClick }) => {

  const [username, setUsername] = useState('');

  const textFieldStyles = classNames(
    "outline-0",
    "bg-[#2B2B2B] rounded-md py-2 px-4",
    "text-lg text-[#CDCDCD] placeholder:text-[#6F6F6F]",
  );

  return (
    <div className="w-full h-full flex gap-4 justify-center items-center">
      <LiaBullhornSolid size={25} color={'#A0A0A0'} />
      <input
        className={textFieldStyles}
        type="text"
        maxLength={20}
        placeholder="type your name..."
        onChange={event => setUsername(event.target.value)}
      />
      <Button
        onClick={() => onClick(username)}
        bgClassName={'px-2 py-2 hover:bg-[#2B4071]'}
        icon={<PiHandFistBold size={22} color='#DBDBDB' />}
        bgColor={'blue-39'}
        label={'Go'}
      />
    </div>
  );
};

export default UsernameModal;