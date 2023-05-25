import { useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";

const usePasswordToggle = () => {
  const [visible, setVisiblity] = useState(false);

  const changeVisible = () => setVisiblity(!visible);

  const icon = (
    <>
      {visible ? (
        <FaRegEye onClick={changeVisible} />
      ) : (
        <RxEyeClosed onClick={changeVisible} />
      )}
    </>
  );

  const inputType = visible ? "text" : "password";

  return [inputType, icon];
};

export default usePasswordToggle;
