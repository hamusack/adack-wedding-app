import { db } from 'common/Firebase'
import { doc , setDoc , addDoc, collection} from 'firebase/firestore'
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
import Tutorial from './components/Tutorial';
import Staff from './components/Staff';

const Mission = ({ missions, answereds, game }) => {
  const isLoggedIn = useContext(LoggedInContext);
  const [dialogInfo, setDialogInfo] = useState({ open: false, title:"" ,value:""});
  const navigation = useNavigate();
  const location = useLocation();
  const [authInfo] = useContext(AuthInfoContext);
  const mission = missions === null ? { isImage:false, missionType : 0, value: "",title: "", path: "" } : missions.find((x) => x.id === location.state.id);
  const [missionImageTextInfo, setMissionImageTextInfo] = useState({})
  const [answered, setAnswered] = useState({})

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
    if (missions == null || missions.length === 0) {
      navigation('/');
    } else {
      setMissionImageTextInfo({ isImage: mission.isImage, type: mission.missionType, value: mission.value });
      setAnswered(getAnsweredsFilter(mission));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missions, answereds])

  useEffect(() => {
    if (mission === null || mission === undefined || answered === null) {
      return
    }
    const ans = answeredFilter(mission);
    if (!location.state.isClear && ans !== null && Object.keys(answered).length !== 0 && ans.user !== authInfo.userId) {
      setDialogInfo({ open:true,title:"", value:`「${mission.title}」は他の人がクリアしました。一覧画面に戻ります。`});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[answered])

  const clearMission = async (text = null) => {
    await addDoc(collection(db, "answered"), createAnswerdRecord(mission, authInfo.userId,authInfo.table, text, true));
  }

  const clearMissionWithDocumentId = async (text = null) => {
    await setDoc(doc(db, "answered", "push_button_clear"), createAnswerdRecord(mission, "", "", text, true));
  }

  const failedMission = async (text = null) => {
    await addDoc(collection(db, "answered"), createAnswerdRecord(mission, authInfo.userId,authInfo.table, text, false));
  }


  const viewMissionDetail = () => {
    switch (mission.missionType) {
      case 0:
        return <Tutorial game={game} clearMission={clearMission} />
      case 1:
        return <Riddle mission={mission} clearMission={clearMission} setDialogInfo={setDialogInfo} answered={answered}/>;
      case 2:
        return <FreeWords mission={mission} clearMission={clearMission} setDialogInfo={setDialogInfo} answered={answered}/>;
      case 3:
        return <Choice mission={mission} clearMission={clearMission} failedMission={failedMission} setDialogInfo={setDialogInfo} answered={answered}/>;
      case 4:
        return <Kujibiki mission={mission} clearMission={clearMission} failedMission={failedMission} setDialogInfo={setDialogInfo} answered={answered} setMissionImageTextInfo={setMissionImageTextInfo} />;
      case 5:
        return <Push mission={mission} clearMission={clearMissionWithDocumentId} setDialogInfo={setDialogInfo} answered={answered}  />;
      case 6:
        return <Staff mission={mission} />;
        default:
        return "ミッション種別が不明です";
    }
  }

  const handleDialogClose = () => {
    setDialogInfo(prev => {
      return {...prev, open: false}
    });
    navigation('/');
  }


  if (!isLoggedIn) {
    return <div>ログインされておりません。申し訳ございませんがQRコードを読み込み直してください。何度もこの画面が表示される場合、スタッフにお声がけください。</div>
  } else {
    return (
      <>
        <button
          onClick={() => { navigation(-1); }}
          className={ mission.missionType === 0 ? "backButton visibleFalse": "backButton" }
        >{"<< Back"}</button>
        <h3 className="missionTitle">{mission.title}</h3>
          <MissionImageText mission={missionImageTextInfo} />
        {viewMissionDetail()}
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