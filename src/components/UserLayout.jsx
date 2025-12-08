import { Outlet } from "react-router-dom";
import UserProfileAside from "./UserProfileAside";

const UserLayout = () => {
  return (
    <>
      <UserProfileAside />
      <Outlet />
    </>
  );
};

export default UserLayout;
