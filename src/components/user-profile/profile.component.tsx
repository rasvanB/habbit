import { Icon } from "@iconify/react";
import React, { useContext, useRef } from "react";
import { UserContext } from "../../context/user.context";
import { showToast } from "../../utils/toast/habit-toasts";

type ProfileProps = {
  isOpen: boolean;
  close: () => void;
};

const MB = 1048576;

const Profile = ({ isOpen, close }: ProfileProps) => {
  const { currentUser } = useContext(UserContext);
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    close();
  };

  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      if (image.size > 2 * MB) {
        showToast("error", "File size too big (max. 2MB)");
      } else {
      }
    }
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed top-0 left-0 h-screen w-screen justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm font-poppins z-50`}
    >
      <div className="relative bg-slate-100 dark:bg-zinc-700 flex flex-col px-2 py-5 pt-10 rounded-md w-full mobile:w-auto mobile:px-10 mobile:max-w-[500px]">
        <Icon
          icon="clarity:close-line"
          className="p-1 text-2xl absolute top-2 right-3 dark:text-gray-200 cursor-pointer rounded-full outline outline-1 dark:outline-zinc-600 outline-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-500 bg-white dark:bg-zinc-600"
          onClick={handleClose}
        />
        <div className="text-center mb-2">User Profile</div>
        <div className="w-fit h-fit relative">
          <img
            alt="profile"
            src={currentUser?.photoURL}
            referrerPolicy="no-referrer"
            className="rounded-full outline outline-2 dark:outline-zinc-400"
          />
          <input
            type="file"
            ref={uploadRef}
            hidden
            accept="image/jpeg,image/png"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
          <Icon
            icon="clarity:edit-solid"
            className="absolute bottom-[-5px] right-1 bg-blue-600 p-2 text-3xl rounded-full cursor-pointer hover:bg-blue-500"
            onClick={handleUploadClick}
          ></Icon>
        </div>
      </div>
    </div>
  );
};

export default Profile;
