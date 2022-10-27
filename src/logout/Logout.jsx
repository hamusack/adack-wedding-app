import {  useEffect } from 'react';


const Logout = () => {

  useEffect(() => {
    window.localStorage.clear();
    // window.localStorage.setItem("authInfo", null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return 'ログアウトしました。もう一度QRを読み取ってください。';
}

export default Logout;