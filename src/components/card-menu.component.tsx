import React from "react";

const CardMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } dark:bg-zinc-600 dark:text-gray-200 font-poppins text-sm absolute top-0 -right-24 rounded-sm`}
    >
      <h1>card menu</h1>
    </div>
  );
};

export default CardMenu;
