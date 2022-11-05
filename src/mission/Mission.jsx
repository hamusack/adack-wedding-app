import { db } from 'common/Firebase'
import { doc , setDoc , addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { useState, useEffect, useContext } from 'react';
import MaskDialog from 'common/components/MaskDialog'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoggedInContext } from "common/components/AuthContextProvider";
import Riddle from 'mission/components/Riddle';
import Choice from 'mission/components/Choice';
import 'mission/Mission.css';
import { AuthInfoContext } from 'common/components/AuthContextProvider';
import {createAnswerdRecord} from 'common/CommonFunctions'
import MissionImageText from 'mission/components/MissionImageText'
import FreeWords from './components/FreeWords';
import Kujibiki from './components/Kujibiki';
import Push from './components/Push';
import Extra from './components/Extra';
// import Tutorial from './components/Tutorial';
import Staff from './components/Staff';
import OurComment from './components/OurComment';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Mission = ({ missions, answereds, game }) => {
  const isLoggedIn = useContext(LoggedInContext);
  const [dialogInfo, setDialogInfo] = useState({ open: false, title:"" ,value:""});
  const navigation = useNavigate();
  const location = useLocation();
  const [authInfo] = useContext(AuthInfoContext);
  const mission = missions === null ? { isImage:false, missionType : 0, value: "",extraValue: "", title: "", path: "" } : missions.find((x) => x.id === location.state.id);
  const [missionImageTextInfo, setMissionImageTextInfo] = useState({})
  const [answered, setAnswered] = useState({});
  const [backButtonDisable, setBackButtonDisable] = useState(false);
  const [isExClear, setIsExClear] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const answeredFilter = (mission) => {
    let ans = null;
    switch (mission.answerType) {
      case 1:
      case 2:
        ans = answereds.filter((answered) => answered.mission === mission.id)[0]
        break;
      case 3:
        ans = answereds.filter((answered) => answered.mission === mission.id && answered.table === authInfo.table)[0];
        break;
      case 4:
        ans = answereds.filter((answered) => answered.mission === mission.id && answered.user === authInfo.userId)[0];
        break;
      default:
        return null;
    }

    if (ans === undefined) {
      return null;
    } else {
      return ans;
    }
  }

  const getAnsweredsFilter = (mission) => {
    return answeredFilter(mission);
  };


  useEffect(() => {
    document.title = "ミッション画面";
    if (missions == null || missions.length === 0) {
      navigation('/');
    } else {
      setMissionImageTextInfo({ isImage: mission.isImage, type: mission.missionType, value: mission.value, extraValue: mission.extraValue });
      setAnswered(getAnsweredsFilter(mission));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missions, answereds])

  useEffect(() => {
    if (mission === null || mission === undefined || answered === null) {
      return
    }
    const ans = answeredFilter(mission);
    if (!location.state.isClear && ans !== null && Object.keys(answered).length !== 0 && ans.user !== authInfo.userId && mission.missionType !== 5) {
      setDialogInfo({ open:true,title:"", value:`「${mission.title}」は他の人がクリアしました。一覧画面に戻ります。`});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[answered])

  const clearMission = async (text = null) => {
    await addDoc(collection(db, "answered"), createAnswerdRecord(mission, authInfo.userId, authInfo.table, text, true));
  }

  const exClearMission = async () => {
    await addDoc(collection(db, "answered"),
      {
      mission: mission.id,
      user: authInfo.userId,
      table: null ,
      point: 0 ,
      text: 'ExClear',
      createdAt: serverTimestamp(),
      missionType: mission.missionType
      }
    );
  }

  const clearMissionWithDocumentId = async (text = null) => {
    await setDoc(doc(db, "answered", authInfo.userId), createAnswerdRecord(mission, authInfo.userId ,authInfo.table, text, true));
    await setDoc(doc(db, "answered", "push_button_clear"), createAnswerdRecord(mission, "", "", text, true));
  }

  const failedMission = async (text = null) => {
    await addDoc(collection(db, "answered"), createAnswerdRecord(mission, authInfo.userId,authInfo.table, text, false));
  }


  const viewMissionDetail = () => {
    switch (mission.missionType) {
      case 0:
        return <Choice game={game} mission={mission} clearMission={clearMission} failedMission={failedMission} setDialogInfo={setDialogInfo} answered={answered}/>;
      case 1:
        return <Riddle game={game} mission={mission} clearMission={clearMission} setDialogInfo={setDialogInfo} answered={answered}/>;
      case 2:
        return <FreeWords game={game} mission={mission} clearMission={clearMission} setDialogInfo={setDialogInfo} answered={answered}/>;
      case 3:
        return <Choice  game={game} mission={mission} clearMission={clearMission} failedMission={failedMission} setDialogInfo={setDialogInfo} answered={answered}/>;
      case 4:
        return <Kujibiki game={game} mission={mission} clearMission={clearMission} failedMission={failedMission} setDialogInfo={setDialogInfo} answered={answered} setMissionImageTextInfo={setMissionImageTextInfo} />;
      case 5:
        return <Push game={game} mission={mission} clearMission={clearMissionWithDocumentId} setDialogInfo={setDialogInfo} answered={answered} setBackButtonDisable={setBackButtonDisable} />;
      case 6:
        return <Staff mission={mission} />;
      case 7:
        return <Extra game={game} mission={mission} clearMission={clearMission} exClearMission={exClearMission} setDialogInfo={setDialogInfo} answered={answered} isExClear={isExClear} />;
          default:
        return "ミッション種別が不明です";
    }
  }

  const handleDialogClose = () => {
    setDialogInfo(prev => {
      document.getElementById("ourComments").scrollIntoView();
      return {...prev, open: false}
    });
  }

const BackButton = styled(Button)(
  ({ theme }) => ({
    width: 80,
    marginTop: 10,
    marginLeft:10,
    backgroundColor: "#030244",
    border:"solid 2px #DABE00",
    color:"#FFF"
  })
);

  const typeName = (title, type) => {
    switch (type) {
      case 0:
        return 'Yontaku!';
      case 1:
        if (title.indexOf("チャレンジ") !== -1) {
          return 'Action!';
        } else {
          return 'Nazotoki!';
        }
      case 2:
        return 'FreeWords!';
      case 3:
        return 'Quiz!';
      case 4:
        return 'Omikuji!';
      case 5:
        return 'Push!';
      case 6:
        return 'Action!';
      case 7:
        return 'Action!';
        default:
        return '';
    }
  }

  if (!isLoggedIn) {
    return <div>ログインされておりません。申し訳ございませんがQRコードを読み込み直してください。何度もこの画面が表示される場合、スタッフにお声がけください。</div>
  } else {
    return (
      <>
        <BackButton
          onClick={() => { navigation(-1); }}
          disabled={backButtonDisable}
          // className={ mission.missionType === 0 ? "backButton visibleFalse": "backButton" }
          className="backButton"
        >{"戻る"}</BackButton>
        <h3 className="heading07" data-en={typeName(mission.title, mission.missionType)}>{mission.title}</h3>
        <MissionImageText game={game} mission={missionImageTextInfo} setIsExClear={setIsExClear} />
        {viewMissionDetail()}
        {answered !== null || game.status >= 4 ? <OurComment game={game} mission={mission} /> : ""}
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