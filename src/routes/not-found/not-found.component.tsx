import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header.component";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="h-screen dark:bg-zinc-800">
      <Header />
      <div className="pt-48 text-center text-7xl text-poppins font-bold dark:text-gray-300">
        NOT BUILT YET :)
      </div>
    </div>
  );
};
export default NotFound;
