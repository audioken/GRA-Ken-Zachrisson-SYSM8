import "./UserMenuStyles.css";
import { useState } from "react";
import UserMenuLink from "./UserMenuLink";
import UserMenu from "./UserMenu";

function UserMenuContainer({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-menu-container-container">
      <UserMenuLink user={user} onClick={() => setOpen((open) => !open)} />
      {open && <UserMenu />}
    </div>
  );
}

export default UserMenuContainer;
