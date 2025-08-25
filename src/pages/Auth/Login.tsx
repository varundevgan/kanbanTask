import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showSignup, setShowSignup] = useState<boolean>(true);
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const matchMedia = gsap.matchMedia();

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("clicked");
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    if (username === "test" && password === "1234") {
      localStorage.setItem("token", "fake_jwt_token");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
    navigate("/dashboard");

    console.log(isLoggedIn);
    
  }

  function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("clicked");
    setShowSignup(!showSignup);
    navigate("/login");
  }

  window.addEventListener("resize", () => setWidth(window.innerWidth));

  useEffect(() => {
    matchMedia.add("(min-width: 1024px)", () => {
      if (!showSignup) {
        navigate("/sign-up", { replace: true });

        gsap.to("#bigBalls", {
          x: "95%",
          duration: 1,
        });
        gsap.to("#login", {
          x: "100%",
          duration: 1,
          opacity: 0,
        });
        gsap.to("#signup", {
          x: "0%",
          duration: 1,
          opacity: 1,
        });
      } else {
        navigate("/login", { replace: true });

        gsap.to("#bigBalls", {
          x: "0%",
          duration: 1,
        });
        gsap.to("#signup", {
          x: "-100%",
          duration: 1,
          opacity: 0,
        });
        gsap.to("#login", {
          x: "0%",
          duration: 1,
          opacity: 1,
        });
      }
    });

    if (width < 1024) {
      gsap.to("#bigBalls, #login, #signup", {
        x: 0,
      });
    }
    if (width > 1024) {
      gsap.to("#bigBalls, #login, #signup", {
        y: 0,
      });
    }

    matchMedia.add("(max-width: 1023px)", () => {
      if (!showSignup) {
        navigate("/sign-up", { replace: true });

        gsap.to("#bigBalls", {
          y: "130%",
          duration: 1,
        });
        gsap.to("#login", {
          y: "400",
          duration: 1,
          opacity: 0,
        });
        gsap.to("#signup", {
          y: "40",
          duration: 1,
          opacity: 1,
        });
      } else {
        navigate("/login", { replace: true });

        gsap.to("#bigBalls", {
          y: "-10%",
          duration: 1,
        });
        gsap.to("#signup", {
          y: "-400",
          duration: 1,
          opacity: 0,
        });
        gsap.to("#login", {
          y: "-40",
          duration: 1,
          opacity: 1,
        });
      }
    });

    setTimeout(() => {
      return () => {
        matchMedia.revert();
        window.removeEventListener("resize", () => setWidth(window.innerWidth));
      };
    }, 3000);
  }, [showSignup, width]);

  return (
    <div className="w-full relative flex flex-col lg:flex-row  justify-between h-screen bg-gray-900 bg-[url(https://i.postimg.cc/RFqSM2rc/bg.jpg)] bg-no-repeat bg-cover bg-center overflow-hidden">
      {/* signup */}
      <div
        id="signup"
        className={`flex w-full justify-center opacity-0 z-[10] `}
      >
        <div className="absolute  lg:left-[10%] lg:bottom-[10%]  border-1 border-[rgba(255,255,255,0.2)] rounded-[20px] backdrop-blur-xl px-6 py-4 sm:px-12 sm:py-10 w-70 sm:w-auto">
          <form
            onSubmit={signUp}
            className="flex h-110 sm:h-120 flex-col sm:justify-between"
          >
            <div className="mb-4">
              <h1 className="text-bold uppercase tracking-wide text-4xl text-white text-center font-bold">
                Sign Up
              </h1>
            </div>
            <div className="flex flex-col gap-7">
              <label className="w-60 sm:w-75 px-5 py-3.5 flex justify-between items-center border-1 border-[rgba(255,255,255,0.2)]  rounded-[30px]">
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="text-white placeholder:text-white outline-none border-none"
                />
                <FaUser className="text-white text-sm" />
              </label>
              <label className="w-60 sm:w-75 px-5 py-3.5 flex justify-between items-center border-1 border-[rgba(255,255,255,0.2)]  rounded-[30px]">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="text-white placeholder:text-white outline-none border-none"
                />
                <FaUser className="text-white text-sm" />
              </label>
              <label className="w-60 sm:w-75 mb-10 sm:mb-0 px-5 py-3.5 flex justify-between items-center border-1 border-[rgba(255,255,255,0.2)] rounded-[30px]">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="text-white placeholder:text-white outline-none border-none"
                />
                <FaEyeSlash className="text-white" />
              </label>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-between mt-[-20px] mb-2">
              <div className="flex gap-1 items-center text-white tracking-wide font-[400]">
                <input type="checkbox" className="text-[16px]" />
                <span className="text-[16px]">Remember Me</span>
              </div>
              <div>
                <span>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSignup((prev) => !prev);
                    }}
                    className="text-white decoration-none text-[16px]"
                    href="#"
                  >
                    Login Account !
                  </a>
                </span>
              </div>
            </div>
            <div>
              <button
                className="w-full bg-white text-black py-2.5 px-5 rounded-[50px] font-bold mt-2 sm:mt-0 cursor-pointer"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
      {/* big balls */}
      <div
        id="bigBalls"
        className="w-full h-[90%] top-[-60%] md:top-[-50%] lg:w-[180%] lg:h-[180%] xl:h-[200%] absolute lg:top-[-100%] lg:left-[-125%]  bg-white rounded-full z-[1]"
      ></div>
      {/* login */}
      <div id="login" className={`flex w-full justify-center z-[10]`}>
        <div className="absolute mx-auto bottom-[5%] lg:right-[10%] lg:bottom-[10%]  border-1 border-[rgba(255,255,255,0.2)] rounded-[20px] backdrop-blur-xl px-6 py-4 sm:px-12 sm:py-10 w-70 sm:w-auto">
          <form
            onSubmit={login}
            className="flex h-110 sm:h-120 flex-col justify-between"
          >
            <div>
              <h1 className="text-bold uppercase tracking-wide text-4xl text-white text-center font-bold">
                Login
              </h1>
            </div>
            <div className="flex flex-col gap-7">
              <label className="w-60 sm:w-75 px-5 py-3.5 flex justify-between items-center border-1 border-[rgba(255,255,255,0.2)]  rounded-[30px]">
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="text-white placeholder:text-white outline-none border-none"
                />
                <FaUser className="text-white text-sm" />
              </label>
              <label className="w-60 sm:w-75 px-5 py-3.5 flex justify-between items-center border-1 border-[rgba(255,255,255,0.2)] rounded-[30px]">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="text-white placeholder:text-white outline-none border-none"
                />
                <FaEyeSlash className="text-white" />
              </label>
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex gap-1 items-center text-white tracking-wide font-[400]">
                <input type="checkbox" className="text-[16px]" />
                <span className="text-[16px]">Remember Me</span>
              </div>
              <div>
                <span>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSignup((prev) => !prev);
                    }}
                    className="text-white decoration-none text-[16px]"
                    href="#"
                  >
                    Create Account?
                  </a>
                </span>
              </div>
            </div>
            <div>
              <button
                className="w-full bg-white text-black py-2.5 px-5 rounded-[50px] font-bold cursor-pointer"
                type="submit"
              >
                Login
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
