import React from "react";
import "../index.css";

const Home = () => {
  return (
    <>
    <div className="flex flex-wra justify-center items-center px-4 lg:px-40 py-20 lg:py-8">
      <div className="lg:w-1/2 text-xl font-semibold">
          <p className="font-bold text-3xl underline text-center my-5">InnerSerenity</p>
          <p>
              Connect with expert professionals securely and conveniently. Book
              appointments, access resources, and find support tailored to your needs
              all from the comfort of your home. Begin your journey towards a
              healthier mind today.
          </p>
          
      </div>
      <div className="w-1/2 hidden lg:block">
          <img src="../hero.png" alt="hero" />
      </div>
    </div>
  </>
  )
};

export default Home;
