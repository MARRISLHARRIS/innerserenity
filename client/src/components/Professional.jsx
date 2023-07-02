import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
export default function Professional({
  useraddress,
  name,
  specialization,
  available,
  totalRatings,
  totalScore,
}) {
  // const [name,setName] = useState("suraj")
  // const [gender,setGender] = useState("male")
  // const [age,setAge] = useState(17)
  // const usertype = ""
  // const data = {
  //   name: "blah blah",
  //   specialization: "mental health",
  //   available: true,
  //   totalRatings: 10,
  //   totalScore: 5,
  // };
  return (
    <>
      {/* <div className="bg-gray-200 h-screen w-full flex justify-center items-center"> */}
      <div className="user-card relative flex flex-col rounded-lg w-96 mx-auto bg-white pb-5 mt-20">
        <div className="mt-2 me-2">
          <button
            className={`${
              available ? "bg-green-200" : "bg-gray-200"
            } rounded-full px-3`}
            style={{ float: "right" }}
          >
            {available ? "available" : "unavailable"}
          </button>
        </div>
        <img
          className="w-40 mx-auto -mt-20 rounded-full "
          src="../prof.png"
          alt="user-icon"
        />
        <div className="text-center mt-3 text-3xl font-bold">{name}</div>
        <div className="text-center mt-2 font-semibold text-lg">
          Specialized In: {specialization}
        </div>

        <div className="flex mt-2 justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Rating star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="text-sm font-bold ">{totalScore}</p>
          <p className="text-sm ms-1 font-semibold">({totalRatings} reviews)</p>
        </div>
        <div className="mx-auto my-4">
          <Link
            to={`/chat/p/${useraddress}`}
            state={{ name: name, gender: "p" }}
          >
            <button className="bg-black text-white px-4 py-2 rounded-full">
              Request Appointment
            </button>
          </Link>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
