import { useState, useEffect, useContext } from 'react';
import { db } from 'common/Firebase'
import { doc, addDoc, deleteDoc, getDocs, collection, onSnapshot, serverTimestamp, query ,where, Timestamp} from 'firebase/firestore'
import { AuthInfoContext } from 'common/components/AuthContextProvider';
import ClickButton from 'common/components/ClickButton'
import 'mission/components/css/Push.css';

const Push = ({ mission, clearMission, setDialogInfo, answered }) => {
  const CLEAR_COUNT = 6;
  const [buttonList, setButtonList] = useState([]);
  const [buttonSize, setButtonSize] = useState(0);
  const [authInfo] = useContext(AuthInfoContext);
  const [buttonId, setButtonId] = useState(null);
  const [isClear, setIsClear] = useState(false);

  useEffect(() => {
    const now = new Date()
    now.setSeconds(now.getSeconds() - 5);
    const checkTime = Timestamp.fromDate(now)
    const q = query(collection(db, "button"), where('createdAt', '>=', checkTime));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          buttonList.push({
            ...change.doc.data(),id:change.doc.id
          })
          setButtonSize((prev => prev + 1))
        }
        if (change.type === "modified") {
          buttonList.forEach(function (item, index) {
            if (item.id === change.doc.id) {
              buttonList[index] = change.doc.data()
            }
          })
        }
        if (change.type === "removed") {
          buttonList.forEach(function (item, index) {
            if (item.id === change.doc.id) {
              buttonList.splice(index, 1)
            }
          })
          setButtonSize((prev => prev - 1))
        }
        setButtonList([...buttonList]);
      });
  });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   const now = new Date()
  //   now.setSeconds(now.getSeconds() - 10);
  //   const checkList = buttonList.filter((v) => v.createdAt === null || v.createdAt.toDate() >= now);
  //   setButtonSize(checkList.length);
  // }, []);

  const dataDelete = async () => {
    await deleteDoc(doc(db, "button", buttonId));

    const timer = setTimeout(() => {
      setButtonId(null);
    }, 1 * 1000);

    //クリーンアップ
    return () => {
      clearTimeout(timer);
    };

  }

  useEffect(() => {
    if (buttonSize < CLEAR_COUNT) {
      return;
    } else {
      setIsClear(true);
      clearMission();
      setDialogInfo({ open: true, title: "ミッション達成！", value: `「${mission.title}」をクリア！\n ポイントを${mission.point}ptゲット！` });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [buttonSize])


  useEffect(() => {
      if (buttonId === null) {
        return;
      }

    const timer = setTimeout(() => {
      dataDelete();
    }, 3 * 1000);

    //クリーンアップ
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonId])

  const onPush = async () => {
    const docRef = await addDoc(collection(db, "button"), { user: authInfo.userId, createdAt: serverTimestamp() });
    setButtonId(docRef.id);
  }

  return (
    <>
      <div className="PushMainViewContainer">
        <span>{isClear ? CLEAR_COUNT : buttonSize }</span>
      </div>
      <div className="sendContainer">
        <p className={answered === null ? "visibleFalse attention" : "attention"} >ミッション達成済</p>
        <ClickButton className="pushButton" disabled={buttonId !== null || answered !== null} onClick={onPush} >
        ボタン
      </ClickButton>
      </div>
      <p></p>
  </>
  )
}

export default Push;