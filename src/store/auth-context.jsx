/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { createContext, useState } from "react";

export const authCtx = createContext({
  token: "",
  userInfo: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    stats: [],
    goals: [],
  });

  /* registering User */
  const createUserInDb = async (userName, email, authId) => {
    const userData = {
      userName: userName,
      email: email,
      authId: authId,
    };
    try {
      const res2 = await fetch(
        `${import.meta.env.VITE_API_END_POINT}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const jsonResponse = await res2.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 1) {
        return true;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const register = async (info) => {
    const { userName, email, password } = info;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      import.meta.env.VITE_SOME_API_TOKEN
    }`;
    const loadingToast = toast.loading("Signing Up!", {
      className: "text-5xl",
    });
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: "true",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      setToken(data.localId);
      const isCreated = await createUserInDb(userName, email, data.localId);
      if (isCreated) {
        toast.success("Registered Successfully", {
          id: loadingToast,
          className: "text-5xl",
        });
        setUserInfo({ userName, email, stats: [], goals: [] });
      } else {
        throw new Error("Unable to create user in DB!");
      }
    } catch (err) {
      console.log("error: " + err);
      toast.error(`${err}`, { id: loadingToast, className: "text-5xl" });
    }
  };

  /* Login  */
  const checkUserInDb = async (authId) => {
    const userData = {
      authId: authId,
    };
    try {
      const res2 = await fetch(
        `${import.meta.env.VITE_API_END_POINT}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const jsonResponse = await res2.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error.message);
      }
      if (jsonResponse.code === 1) {
        const data = jsonResponse.data;
        return data;
      }
      if (jsonResponse.code === 0) {
        return {};
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async (info) => {
    const { email, password } = info;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
      import.meta.env.VITE_SOME_API_TOKEN
    }`;
    const loadingToast = toast.loading("Signing Up!", {
      className: "text-5xl",
    });
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: "true",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message);
      }

      const data = await response.json();
      setToken(data.localId);
      const userData = await checkUserInDb(data.localId);
      if (Object.keys(userData).length > 0) {
        const { userName, email, authId, stats, goals } = userData;
        toast.success("Login Successfully!", {
          id: loadingToast,
          className: "text-5xl",
        });
        setUserInfo({ userName, email, authId, stats, goals });
      } else {
        throw new Error("Unable to find user info!");
      }
    } catch (err) {
      console.log("error: " + err);
      toast.error(`${err}`, { id: loadingToast, className: "text-5xl" });
    }
  };
  const logout = () => {
    setToken("");
    setUserInfo({ userName: "", email: "", stats: [], goals: [] });
  };

  const storeObj = {
    token,
    userInfo,
    login,
    logout,
    register,
  };
  return <authCtx.Provider value={storeObj}>{children}</authCtx.Provider>;
};

export default AuthContextProvider;
