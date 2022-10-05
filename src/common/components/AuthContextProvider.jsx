import React,  { useEffect, useState } from "react";

// ログイン状態のContext
export const LoggedInContext = React.createContext(false);
// 認証情報と認証情報セットのContext
export const AuthInfoContext = React.createContext([{ userId: "" }, () => { }]);


function getDefaultAuthInfo() {
  const defaultAuthInfo = window.localStorage.getItem("authInfo");
  if (defaultAuthInfo) {
    return JSON.parse(defaultAuthInfo);
  } else {
    return { userId: "" };
  }
}

function setAutoInfoToLocalStorage(authInfo) {
  const authInfoStringfy = JSON.stringify(authInfo);
  window.localStorage.setItem("authInfo", authInfoStringfy);
}

export const AuthContextProvider = (props) => {
  // stateの定義
  const [loggedIn, setLoggedIn] = useState(false);
  const [authInfo, setAuthInfo] = useState(getDefaultAuthInfo());

  useEffect(() => {
    if (authInfo?.userId) {
      setAutoInfoToLocalStorage(authInfo);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authInfo]);
  return (
    <LoggedInContext.Provider value={loggedIn}>
      <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
        {props.children}
      </AuthInfoContext.Provider>
    </LoggedInContext.Provider>
  );
};