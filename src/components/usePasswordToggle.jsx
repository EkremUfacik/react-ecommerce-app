import { useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";

const usePasswordToggle1 = () => {
  const [visible, setVisiblity] = useState(false);

  const Icon = (
    <>
      {visible ? (
        <FaRegEye onClick={() => setVisiblity((visiblity) => !visiblity)} />
      ) : (
        <RxEyeClosed onClick={() => setVisiblity((visiblity) => !visiblity)} />
      )}
    </>
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle1;

export const usePasswordToggle2 = () => {
  const [visible, setVisiblity] = useState(false);

  const Icon = (
    <>
      {visible ? (
        <FaRegEye onClick={() => setVisiblity((visiblity) => !visiblity)} />
      ) : (
        <RxEyeClosed onClick={() => setVisiblity((visiblity) => !visiblity)} />
      )}
    </>
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};
