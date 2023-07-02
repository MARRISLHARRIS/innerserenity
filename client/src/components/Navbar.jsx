import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export default function Navbar() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const url = import.meta.env.VITE_APP_BACKEND_URL;
  //to:connect metamask
  const connect = async () => {
    try {
      const connector = new MetaMaskConnector();
      const account = await connector.connect();
      localStorage.setItem("useraddress", account.account);
      setIsConnected(true);
      fetch(`${url}/api/getuser/${account.account}`)
        .then((res) => res.json())
        .then((data) => {
          if ('Item' in data.response) {
            navigate("/professionals");
          } else {
            fetch(`${url}/api/getprofessional/${account.account}`)
              .then((res) => res.json())
              .then((data) => {
                if('Item' in data.response) {
                  navigate("/users")
                } else {
                  navigate("/register")
                }
              });
          }
        });
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
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "cursive" }}
            >
              InnerSerenity
            </p>
          </div>
        </Link>

        <div className="mx-5">
          {isConnected ? (
            <>
              <button
                className="m bg-gray-300 text-black font-bold rounded-full px-4 py-2 flex items-center"
                onClick={disconnect}
              >
                Disconnect wallet
              </button>
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
        </div>
      </div>
    </>
  );
}