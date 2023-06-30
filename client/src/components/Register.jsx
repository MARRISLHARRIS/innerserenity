import React, { useState } from "react";
import Createuser from "./Createuser";
import CreateProfessional from "./CreateProfessional";

// import { Link, useNavigate } from "react-router-dom";
export default function Register() {
//   const navigate = useNavigate();
  
  const [type, setType] = useState("");
  return (
    <>
      <div className="flex flex-col  justify-center items-center mt-5">
        <div>
          <p className="font-bold text-3xl">select your role</p>
        </div>
        <div className="flex justify-between gap-5 mt-5">
          <button
            className={`${
              type == "user"
                ? "bg-green-400 text-gr font-bold outline outline-green-600"
                : "outline outline-offset-2 outline-green-500 outline-1 hover:outline-2 hover:bg-green-200"
            } rounded-full p-3 w-32 `}
            onClick={() => setType("user")}
          >
            User
          </button>
          <button
            className={`${
              type == "professional"
                ? "bg-green-400 text-gr font-bold outline outline-green-600"
                : "outline outline-offset-2 outline-green-500 outline-1 hover:outline-2 hover:bg-green-200"
            } rounded-full p-3 w-32 `}
            onClick={() => setType("professional")}
          >
            Professional
          </button>
        </div>
        <div>
          {type ? (
            <>
              {type == "user" ? (
                <>
                  <div>
                    <Createuser />
                  </div>
                </>
              ) : (
                <>
                    <div>
                        <CreateProfessional />
                    </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
