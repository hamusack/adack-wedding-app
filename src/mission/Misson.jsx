import { db } from 'common/Firebase'
import { doc , updateDoc} from 'firebase/firestore'
import { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MaskDialog from 'common/components/MaskDialog'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoggedInContext } from "common/components/AuthContextProvider";
import 'mission/Mission.css';


const Mission = ({ missions }) => {
  const isLoggedIn = useContext(LoggedInContext);
  const [answer, setAnswer] = useState("");
  const [dialogInfo, setDialogInfo] = useState({ open: false, title:"" ,value:""});
  const navigation = useNavigate();
  const location = useLocation();
  const mission = missions === null ? {title:"", path:""} : missions.find((x) => x.id === location.state.id);
  const WRONG_TEXT = "不正解！";

  useEffect(() => {
    if (missions == null) {
      navigation('/');
    }
  }, [])


  const clearMission = async (documentId) => {
    const updateRef = doc(db, 'missions', documentId)
    await updateDoc(updateRef, { status: 3 });
  }

  const answerCheck = () => {
    if (answer === mission.answer) {
      clearMission(mission.id);
      setAnswer("");
      setDialogInfo({ open:true,title:"", value:`「${mission.title}をクリア！\n [○○]ポイントを${mission.point}ptゲット！`});
    } else {
      setAnswer(WRONG_TEXT);
    }
  }

  const answerClear = () => {
    if (answer === WRONG_TEXT) {
      setAnswer("");
    }
  }

  const handleDialogClose = () => {
    setDialogInfo(prev => {
      return {...prev, open: false}
    });
  }
  if (!isLoggedIn) {
    return <div>ログインされておりません。申し訳ございませんがQRコードを読み込み直してください。何度もこの画面が表示される場合、スタッフにお声がけください。</div>
  } else {
    return (
      <>
        <button onClick={
          () => { navigation(-1); }}
        >戻る</button>
        <h3 className="missionTitle">{mission.title}</h3>
        <div className="missionImage">
          <img src={`${process.env.PUBLIC_URL}/images/missions/${mission.path}`} alt="謎"></img>
        </div>
        <div className="missionInput">
          <input type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={answerCheck} onBlur={ answerClear }>送信</button>
        </div>
        <MaskDialog
            onClose={handleDialogClose}
            open={dialogInfo['open']}
            title={dialogInfo['title']}
            value={dialogInfo['value']}
          />
      </>
    )
  }
}

export default Mission;