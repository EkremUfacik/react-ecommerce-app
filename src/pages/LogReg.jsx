import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const LogRes = () => {
  const [isLog, setIsLog] = useState(true);
  return (
    <div className="flex" style={{ height: "calc(100% - 64px)" }}>
      <div className="sm:w-[28rem] w-[25rem] m-auto ">
        <div className="flex gap-2 ">
          <div
            className={`${
              isLog
                ? "bg-white border border-gray-300 border-b-0 font-bold"
                : "bg-gray-200"
            } flex-1 p-4 text-center cursor-pointer transition-all`}
            onClick={() => setIsLog(true)}
          >
            Login
          </div>
          <div
            className={`${
              isLog
                ? "bg-gray-200 "
                : "bg-white border border-gray-300 border-b-0 font-bold"
            } flex-1 p-4 text-center cursor-pointer transition-all`}
            onClick={() => setIsLog(false)}
          >
            Register
          </div>
        </div>
        {isLog ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default LogRes;
