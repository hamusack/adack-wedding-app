import { useState, useEffect } from 'react';
import "admin/Admin.css";
import MissionTabs from "./components/MissionTabs";
import Const from "constants/common";
import {collection, onSnapshot, updateDoc, doc, deleteDoc,query,getDocs} from "firebase/firestore"
import { db } from "common/Firebase";

const Admin = ({ game, missions, answereds }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = "管理画面";
    const userRef = collection(db, 'users');

      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            users.push({
              ...change.doc.data(),id: change.doc.id
            })
          }
          if (change.type === "modified") {
            users.forEach(function (item, index) {
              if (item.id === change.doc.id) {
                users[index] = {...change.doc.data(), id: change.doc.id}
              }
            })
          }
          if (change.type === "removed") {
            users.forEach(function (item, index) {
              if (item.id === change.doc.id) {
                users.splice(index, 1)
              }
            })
          }
          setUsers([...users]);
        });
      });
      return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const nowPoint = () => {
    if (answereds === null) {
      return 0;
    }
    let retPoint = 0;
    answereds.map((v) => (retPoint += Number(v.point)));
    return retPoint;
  };

  const changeGameStatus = async (status) => {
    const gameRef = doc(db, 'game', 'zJAO26VHA79cVuL3fuoM');
    await updateDoc(gameRef, {...game, status:status});
  }

  const collectionAllDelete = async (cl)  => {
    const deleteIds = []
    const querySnapshot = await getDocs(query(collection(db, cl)));
    querySnapshot.docs.map(async (v) => {
      deleteIds.push(v.id);
    })

    deleteIds.map(async (v) => {
      await deleteDoc(doc(db, cl, v))
    }
    );

  }

  if (game.pointArr === undefined) {
    return
  }

  return (
    <>
      <div className="adminCotainer">
        <h2>管理画面</h2>
        <div className="gameControlContainer">
          <h3 className="subTitleLabel">ゲームコントロール</h3>
          <div>
            <p>ゲームフェイズ：{game && Const.GAME_STATUS[game.status]}</p>
          </div>
          <div className="groupInfoContainer">
            <span className="groupCol">現在のポイント：{nowPoint()}</span>
            {game !== null && <span className="groupCol">目標ポイント：{game.pointArr.join("→")}</span>}
          </div>
          <button className="gameControlButton" onClick={() => changeGameStatus(0)}>イベント開始前</button>
          <button className="gameControlButton" onClick={() => changeGameStatus(1)}>チュートリアル</button>
          <button className="gameControlButton" onClick={() => changeGameStatus(2)}>ゲーム開始</button>
          <button className="gameControlButton" onClick={() => changeGameStatus(3)}>終了N分前</button>
          <button className="gameControlButton" onClick={() => changeGameStatus(4)}>ゲーム終了</button>
        </div>
        <div className="missionControlContainer">
          <h3 className="subTitleLabel">各種一覧</h3>
          <MissionTabs game={game} missions={missions} answereds={answereds} users={users} />
        </div>
        <div className="warningButtonContainer">
          <h3 className="subTitleLabel">取り扱い注意</h3>
          <button className="gameControlButton warningButton" onClick={() => collectionAllDelete('missions')}>ミッション全削除</button>
          <button className="gameControlButton warningButton" onClick={() => collectionAllDelete('answered')}>クリア状況全削除</button>
        </div>
      </div>

    </>
  );
};

export default Admin;
