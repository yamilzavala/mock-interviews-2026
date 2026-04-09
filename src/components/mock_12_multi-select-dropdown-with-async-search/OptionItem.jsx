import {memo} from "react";

const OptionItem = ({user, onSelect }) => {

  return (
    <li
     onClick={() => onSelect(user)}
     style={{ padding: "8px", cursor: "pointer" }}
    >
      {user.firstName}
    </li>
  );
};

export default memo(OptionItem);