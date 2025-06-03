// import "./UserMenuStyles.css";
// import { useState } from "react";
// import UserMenuLink from "./UserMenuLink";
// import UserMenu from "./UserMenu";

// function UserMenuContainer({ user }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="user-menu-container-container">
//       <UserMenuLink user={user} onClick={() => setOpen((open) => !open)} />
//       {open && <UserMenu />}
//     </div>
//   );
// }

// export default UserMenuContainer;


import { useRef, useEffect, useState } from "react";
import UserMenuLink from "./UserMenuLink";
import UserMenu from "./UserMenu";

function UserMenuContainer({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Stäng menyn om man klickar utanför
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-menu-container-container" ref={menuRef}>
      <UserMenuLink user={user} onClick={() => setOpen((o) => !o)} />
      {open && <UserMenu closeMenu={() => setOpen(false)} />}
    </div>
  );
}

export default UserMenuContainer;



