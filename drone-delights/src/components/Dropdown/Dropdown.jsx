import "./Dropdown.css";
import { useState } from "react";
import DropdownButton from "../DropdownButton/DropdownButton";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function Dropdown({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <DropdownButton user={user} onClick={() => setOpen((open) => !open)} />
      {open && <DropdownMenu />}
    </div>
  );
}

export default Dropdown;
