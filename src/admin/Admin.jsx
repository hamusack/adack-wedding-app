import { db } from 'common/Firebase'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { doc ,  onSnapshot,  collection, orderBy, query } from 'firebase/firestore'
import 'admin/Admin.css'
import MissionTabs from './components/MissionTabs';

const Admin = () => {
  const [game, setGame] = useState(null);
  const [missions, setMissions] = useState(null);
  const [missionGroups, setMissionGroups] = useState(null);

  useEffect(() => {
    const gameRef = doc(db, 'game','zJAO26VHA79cVuL3fuoM');
    const unsub = onSnapshot(gameRef, (docSnapshot) => {
      setGame(docSnapshot.data());
    }
    );
    return unsub;
  }, []);

  useEffect(() => {
    const missionsGroupRef = collection(db, 'missionGroups');
    const unsub = onSnapshot(missionsGroupRef, (collectionSnapShot) => {
      const missionGroupList = [];
      collectionSnapShot.forEach((doc) => {
        missionGroupList.push({ ...doc.data() ,id: doc.id});
      }
      );
      setMissionGroups(missionGroupList);
    });
      return unsub;
  }, []);


  useEffect(() => {
    const missionsRef = collection(db, 'missions');
    const q = query (missionsRef, orderBy("createTime"));
    const unsub = onSnapshot(q, (collectionSnapShot) => {
      const missionList = [];
      collectionSnapShot.forEach((doc) => {
        missionList.push({ ...doc.data() ,id: doc.id});
      }
      );
      setMissions(missionList);
    });
      return unsub;
  }, []);


  return (
    <>
      <div className="adminCotainer">
        <h2>管理画面</h2>
        <div className="gameControlContainer">
          <h3 className="subTitleLabel">ゲームコントロール</h3>
        <div>
          <p>ゲームステータス：{game === null ? "" : game.status}</p>
        </div>
        <Button>ゲーム開始</Button>
        <Button>ゲーム終了</Button>
        </div>
        <div className="missionControlContainer">
        <h3 className="subTitleLabel">ミッションコントロール</h3>
          <MissionTabs missions={missions} missionGroups={missionGroups} />
          </div>
      </div>
    </>
  )
}

export default Admin;