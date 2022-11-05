import { db } from 'common/Firebase'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc ,  onSnapshot, updateDoc } from 'firebase/firestore'
import { AuthInfoContext } from 'common/components/AuthContextProvider';
import { styled } from '@mui/material/styles';


const LoginTextField = styled(TextField)(({ theme }) => ({
  width: 200,
}));

const LoginButton = styled(Button)(({ theme }) => ({
  width: 180,
  marginTop: 20,
  backgroundColor: "#030244",
  border:"solid 1px #FFDF04",
  color:"#FFF"
}));

const LoginContainerDiv = styled("div")(({ theme }) => ({
  width:"80%",
  display:"flex",
  flexFlow: "column",
  alignItems: "center",
  justifyContent: "center",
  margin:"0 auto",
}));

const Login = ({ game }) => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [userId, setUserId] = useState(useParams()['*']);
  // eslint-disable-next-line no-unused-vars
  const [authInfo, setAuthInfo] = useContext(AuthInfoContext);

  const updateUserName = async () => {
    const userDocumentRef = doc(db, 'users', userId);
    await updateDoc(userDocumentRef, { name: name });
  }

  const send = () => {
    if (name !== "") {
      updateUserName();
      setAuthInfo({ userId: userId,table: table,name: name });
      navigate('/');
    }
  }

  useEffect(() => {
    document.title = "ログイン画面";
    if (userId === "") {
      return;
    }
    const userDocumentRef = doc(db, 'users', userId);
    const unsub = onSnapshot(userDocumentRef, (documentSnapshot) => {
      if (documentSnapshot.data() === undefined) {
        setUserId("");
      } else {
        setName(documentSnapshot.data().name)
        setTable(documentSnapshot.data().table)
      }
    });
    return unsub;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (game.status === 0) {
    return <div className="dispMessageContainer"><div>本日は結婚式にご出席いただき、誠にありがとうございます！短い時間ですが、披露宴を是非お楽しみください！</div></div>;
  }

  if (userId === "") {
    return <div className="dispMessageContainer"><div>申し訳ございませんがQRコードを読み込み直してください。何度もこの画面が表示される場合、スタッフにお声がけください</div></div>
  } else {
    return (
      <>
        <h2 className="heading07" data-en="NameEntry!"><span>お名前登録</span></h2>
        <LoginContainerDiv>
          <LoginTextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="お名前"
            />
          <LoginButton onClick={send}>ログイン</LoginButton>
        </LoginContainerDiv>
      </>
    )
  }
}

export default Login;