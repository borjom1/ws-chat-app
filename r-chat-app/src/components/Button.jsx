import classNames from "classnames";

const Button = ({
  onClick, icon, label, 
  bgHexColor, bgColor, fontSize,
  labelHexColor, labelColor,
  bgClassName, labelClassName
}) => {

  const bgClasses = classNames(
    'w-max h-max flex justify-center items-center rounded-lg cursor-pointer hover:scale-95 duration-300',
    !!label && 'gap-2 py-1 px-5',
    bgHexColor ? `bg-[${bgHexColor}]` : bgColor ? `bg-${bgColor}` : 'bg-eerie-black',
    bgClassName
  );

  const labelClasses = classNames(
    labelHexColor ? `text-[${labelHexColor}]` : labelColor ? `text-${labelColor}` : 'text-platinum-e8',
    `text-${fontSize}`,
    labelClassName
  );

  return (
    <div className={bgClasses} onClick={onClick}>
      {icon}
      <p className={labelClasses}>{label}</p>
    </div>
  );
};

export default Button;