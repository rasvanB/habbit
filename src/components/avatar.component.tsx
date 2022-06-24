import { FC } from "react";

type AvatarProps = {
  photoUrl: string;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const Avatar: FC<AvatarProps> = ({ photoUrl, ...otherProps }) => {
  return (
    <div className="w-[35px] h-[35px] cursor-pointer" {...otherProps}>
      <img
        alt="profile"
        src={photoUrl}
        referrerPolicy="no-referrer"
        className="rounded-md outline outline-2 outline-offset-2 outline-blue-400"
      />
    </div>
  );
};

export default Avatar;
