import { FC } from "react";

type NavProps = {
  username: string;
};

const Nav: FC<NavProps> = ({ username }) => {
  return <h1>{`hello ${username}`}</h1>;
};
export default Nav;
