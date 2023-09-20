/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authCtx } from "../../store/auth-context";
import Button from "../UI/Button";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import {AiTwotoneThunderbolt} from "react-icons/ai"
import leftImg from "../../assets/Icons/right-img.png";
import logo from "../../../public/logo2.png";
import classes from "./Home.module.css";
import { BsCheck2Circle } from "react-icons/bs";
import bgIcon from "../../assets/Icons/bg-icon.png"
import bgIcon2 from "../../assets/Icons/medical.png"


const Home = ({ showAuthHandler }) => {
  const authContext = useContext(authCtx);
  console.log(authContext);

  const logoutHandler = () => {
    authContext.logout();
  };
  return (
    <div className="h-[100vh] relative overflow-hidden flex flex-col justify-around w-full bg-bgd home">


      {/* <div className="bgIcon left-[24.3rem] top-[43.75rem] absolute">
           <img className="w-[10rem]" src={bgIcon2} alt="" />
      </div> */}

      {/* <div className="bgIcon left-[70rem] bottom-[55rem] absolute">
           <img className="w-36" src={bgIcon2} alt="" />
      </div> */}



      <div className="bar flex  items-center justify-between mx-48">
        <div className="bar flex  items-center justify-center ">
          <img className="w-10 h-10" src={logo} alt="" />
          <h1 className="logo-txt text-bgl font-[Righteous]  text-b1">
            SSENCE
          </h1>
        </div>
        <div className="login-bar flex">
          {authContext.userInfo.isLoggedIn ? (
            <Button
              onClick={logoutHandler}
              className="text-[#156669] font-[Righteous] cursor-pointer  text-b1"
              text={"Logout"}
            ></Button>
          ) : (
            <div>
              <button className=" text-bgl font-[Righteous] cursor-pointer  text-b1">
                Login
              </button>
              <button
                onClick={showAuthHandler}
                className="border-l-2 pl-8 ml-8 cursor-pointer border-slate-50 text-bgl font-[Righteous]  text-b1"
              >
                SignUp
              </button>
            </div>
          )}
        </div>
      </div>

      {/* <div className="logo flex flex-col items-center justify-center pt-[0rem]">
        <img className="w-[2.5rem] h-[2.5rem]" src={logo} alt="" />
        <h1 className="logo-txt text-[#156669] font-[Righteous]  text-[2rem]">
          ESSENCE
        </h1>
      </div> */}
      {/* <div>
        <Button text="SignUp" onClick={showAuthHandler}></Button>
      </div> */}

      <div className="hero-content flex justify-between mx-48">
        <div className="left flex flex-col justify-center">
          <div className="upper-txt text-bgl font-[Montserrat]  font-extrabold text-5xl tracking-wide leading-[4rem] ">
            <h1 className="w-x upt">
              Say goodbye to neck and back pain with{" "}
            </h1>
          </div>
          <div className="main-txt">
            <h1 className="m-txt h-th text-bght font-[Noto+Sans] ml-[-.5rem] font-black text-fs2 leading-[12rem] ">
              ESSENCE{" "}
            </h1>
            {/* <div className="main-side-txt border-[#156669] w-[25rem] h-[5rem] border-b-[.5rem] border-r-[.5rem] ml-[40rem]">
              <h1 className="pl-[7rem] text-[#156669] font-[Lilita+one] font-bold text-[2.2rem]">
                posture alerts.{`"`}
              </h1>
            </div> */}
          </div>
          <div className="nav-btn-container mt-10  ">
            <button className="navbtn ">
              <NavLink
                className="nav-link flex items-center border border-bgl relative overflow-hidden text-bght font-[Montserrat] font-[600] rounded-[20rem] text-b1 p-8 pr-28"
                to="/dashboard"
              >
                Get Started
                <div className="icon-btn py-8 w-16  rounded-round mr-4  bg-bght absolute flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    ></path>
                  </svg>
                </div>
              </NavLink>
            </button>
          </div>
        </div>

        <div className="right flex flex-col">
        
       <div className="right mr-40 flex flex-col">
             {/* <div className=" absolute rounded-full top-[-1rem] right-[50rem] rotate-[-45deg] h-[60rem] w-[10rem] bg-transparent border-4 border-[#0e948d8a]"></div> */}
            <div className="img-container absolute border-[#97c0bc]  w-[95rem] h-[90rem]" />
            <div className="left-img w-x1 z-10 h-x1 flex items-center justify-center  bg-bght">
              <img className="border-4 border-bgl rounded-round r-img " src={leftImg} alt="" />
            </div>
          </div>

          {/* nav */}

          

          
        </div>
      </div>
      <div className="icon-container flex items-center justify-between mx-52">
        {/* <ul className="icons flex items-center justify-center gap-8">
          <li>
            {" "}
            <a href="">
              <img src={linkdin} alt="" />
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
              <img src={github} alt="" />{" "}
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
              <img src={twitter} alt="" />
            </a>{" "}
          </li>
        </ul> */}
        <ul className="icons flex gap-10 ml-4 items-center justify-center">
          <li>
            {" "}
            <a href="">
              <FaLinkedinIn className=" icon w-11 h-11 text-bgl" />
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
              <BsGithub className="icon w-11 h-11 text-bgl" />
            </a>{" "}
          </li>
          <li>
            {" "}
            <a href="">
              <BsTwitter className="icon w-11 h-11 text-bgl" />
            </a>{" "}
          </li>
        </ul>
        <div>
          <h1 className="text-3xl flex items-center font-[Noto+Sans] font-bold px-4 tag">
            Made with<AiTwotoneThunderbolt className="w-10 h-12 pl-1 text-bgl"/>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
