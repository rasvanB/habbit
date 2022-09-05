import { Icon } from "@iconify/react";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext, UserData } from "../../context/user.context";
import {
  editUser,
  getImagesStorageRef,
} from "../../utils/firebase/firebase.utils";
import { showToast } from "../../utils/toast/habit-toasts";
import Button from "../other/button.component";
import InputBox from "../other/input-box.component";
import Modal from "../other/modal.component";

type ProfileProps = {
  isOpen: boolean;
  close: () => void;
};

const MB = 1048576;

const Profile = ({ isOpen, close }: ProfileProps) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [hasChanged, setChanged] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.displayName);
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    close();
    setChanged(false);
    setNameInput(currentUser?.displayName);
  };

  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  useEffect(() => {
    setNameInput(currentUser?.displayName);
  }, [currentUser]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      if (image.size > 2 * MB) {
        showToast("error", "File size too big (max. 2MB)");
      } else {
        if (currentUser) {
          const storageRef = getImagesStorageRef(currentUser.uid);
          const uploadTask = uploadBytesResumable(storageRef, image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setLoading(true);
            },
            (error) => {
              console.error(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                const newUser: UserData = {
                  ...currentUser,
                  photoURL: downloadUrl,
                };
                setCurrentUser(newUser);
                editUser(newUser);
                showToast("success", "Profile picture has been changed");
                setLoading(false);
              });
            }
          );
        }
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNameInput(value);
    setChanged(true);
  };

  const handleSaveChanges = () => {
    if (currentUser) {
      if (nameInput && nameInput.length > 3 && nameInput.length < 20) {
        const newUser: UserData = {
          ...currentUser,
          displayName: nameInput,
        };
        setCurrentUser(newUser);
        editUser(newUser);
        showToast("success", "Changes have been saved succesfully");
        handleClose();
      } else {
        showToast("error", "Invalid name");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} close={handleClose}>
      <div className="text-center mb-2 text-lg dark:text-white text-neutral-500">
        User Profile
      </div>
      <div className="w-fit h-fit relative self-center mb-2">
        {isLoading ? (
          <div className="rounded-full flex items-center justify-center outline outline-2 dark:outline-zinc-400 w-[85px] h-[85px] object-cover">
            <Icon
              icon={"line-md:loading-twotone-loop"}
              className="text-6xl text-blue-500"
            />
          </div>
        ) : (
          <img
            alt="profile"
            src={currentUser?.photoURL}
            referrerPolicy="no-referrer"
            className="rounded-full outline outline-2 dark:outline-zinc-400 outline-zinc-300 w-[85px] h-[85px] object-cover"
          />
        )}
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
          className="absolute bottom-[-5px] right-1 dark:bg-blue-600 bg-blue-400 p-2 text-3xl rounded-full text-white cursor-pointer hover:bg-blue-500"
          onClick={handleUploadClick}
        ></Icon>
      </div>
      <InputBox label="Name" value={nameInput} onChange={handleChange} />
      {hasChanged && (
        <div className="flex">
          <Button buttonStyle="save-changes" onClick={handleSaveChanges}>
            Save changes
          </Button>
          <Button buttonStyle="cancel" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default Profile;
