import { db } from 'common/Firebase'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc ,  onSnapshot, updateDoc } from 'firebase/firestore'
import { AuthInfoContext } from 'common/components/AuthContextProvider';

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
      setAuthInfo({ userId: userId,table: table });
      navigate('/');
    }
  }

  useEffect(() => {
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
    return <div>ゲーム開始前です。</div>;
  }

  if (userId === "") {
    return <div>申し訳ございませんがQRコードを読み込み直してください。何度もこの画面が表示される場合、スタッフにお声がけください</div>
  } else {
    return (
      <>
        <h2>お名前登録画面</h2>
        <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="お名前"
            />
        <Button onClick={send}>ログイン</Button>
      </>
    )
  }
}

export default Login;