import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Oval, } from "react-loader-spinner";
export default function Navbar() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [type,setType] = useState("")
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  //to:connect metamask
  const connect = async () => {
    try {
      setLoading(true);
      const connector = new MetaMaskConnector();
      const account = await connector.connect();
      localStorage.setItem("useraddress", account.account);
      setIsConnected(true);
      fetch(`${url}/api/getuser/${account.account}`)
        .then((res) => res.json())
        .then((data) => {
          if ("Item" in data.response) {
            navigate("/professionals");
            setType("professionals")
          } else {
            fetch(`${url}/api/getprofessional/${account.account}`)
              .then((res) => res.json())
              .then((data) => {
                if ("Item" in data.response) {
                  navigate("/users");
                  setType("users")
                } else {
                  navigate("/register");
                }
              });
          }
        });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //to:disconnect metamask
  const disconnect = async () => {
    try {
      const connector = new MetaMaskConnector();
      await connector.disconnect();
      setIsConnected(false);
      localStorage.removeItem("useraddress");
      // setAccount(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-gray-800">
        <Link to="/">
          <div className="flex items-center">
            <img style={{ width: "3rem" }} src="/logo.png" alt="logo" />
            <p
              className="text-xl lg:text-2xl font-bold text-white"
              style={{ fontFamily: "cursive" }}
            >
              InnerSerenity
            </p>
          </div>
        </Link>

        <div className="mx-0 lg:mx-5">
          {loading ? (
            <>
              <div className="bg-gray-300 text-black font-bold rounded-full w-40">
                <div className="flex justify-center items-center">
                  <Oval
                    height={40}
                    width={40}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {isConnected ? (
                <>
                  <div className="flex justify-around text-white text-sm lg:text-xl items-center gap-2 lg:gap-5">
                    <div>
                      <Link to={`${type}`}>
                        <p>{type}</p>
                      </Link>
                    </div>
                    <div>
                      <Link to="/events">
                        <p>Events</p>
                      </Link>
                    </div>
                    <div>
                      <button
                        className=" bg-gray-300 text-black font-bold rounded-full px-1 py-2 lg:px-4 flex items-center text-sm"
                        onClick={disconnect}
                      >
                        Disconnect wallet
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="m bg-green-300 text-black font-bold rounded-full px-4 py-2 flex items-center"
                    onClick={connect}
                  >
                    {/* <img className="w-8 hidden lg:block" src="../metafox.png" alt="metaMask-logo" /> */}
                    Connect wallet
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
