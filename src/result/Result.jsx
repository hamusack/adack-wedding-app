import { useState, useEffect } from "react";
import "result/Result.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "common/Firebase";

const Result = ({ game, missions, answereds }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = "結果画面";
    const userRef = collection(db, "users");

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          users.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
        if (change.type === "modified") {
          users.forEach(function (item, index) {
            if (item.id === change.doc.id) {
              users[index] = { ...change.doc.data(), id: change.doc.id };
            }
          });
        }
        if (change.type === "removed") {
          users.forEach(function (item, index) {
            if (item.id === change.doc.id) {
              users.splice(index, 1);
            }
          });
        }
        setUsers([...users]);
      });
    });
    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rankSinroSinpuDraw = () => {
    let answeredsCorrectList = [];
    answereds.filter((v) => v.missionType === 3 && v.point !== 0  && v.user !== "")
      .map((v) => {
        const m = missions.find((value) => value.id === v.mission);
        answeredsCorrectList.push({
          user: v.user,
          title: m.title
        });
        return null;
      });
    const sack_counter = answeredsCorrectList.filter(v => v.title.startsWith("クイズ") || v.title.startsWith("新郎クイズ")).reduce((result, current) => {
      const chkUser = result.find((value) => value.user === current.user);
      const user = users.filter(u => u.id === current.user)
      console.log(user);
      if (chkUser) {
        chkUser.count += 1;
      } else {
        result.push({
          user: current.user,
          name: user !== undefined && user.length !== 0 ? user[0].name : "",
          table: user !== undefined && user.length !== 0 ? user[0].table : "",
          count: 1,
        });
      }
      return result;
    }, []);
    const adaku_counter = answeredsCorrectList.filter(v => v.title.startsWith("クイズ") || v.title.startsWith("新婦クイズ")).reduce((result, current) => {
      const chkUser = result.find((value) => value.user === current.user);
      const user = users.filter(u => u.id === current.user)
      if (chkUser) {
        chkUser.count += 1;
      } else {
        result.push({
          user: current.user,
          name : user !== undefined && user.length !== 0 ? user[0].name : "",
          table: user !== undefined && user.length !== 0 ? user[0].table : "",
          count: 1,
        });
      }
      return result;
    }, []);
    return (
      <>
        <h3 className="resultSubject">【新郎の理解者】</h3>
        <span style={{ color:"yellow" }}>2位以降は同点の場合のみ発表</span>
        {sack_counter.sort((a, b) => a.count < b.count ? 1 : -1 ).slice(0,3).map((v, index) => {
          return (
            <div className="rankList">
              <span className="rank">{index + 1}位</span>
              <span className="table">{v.table}</span>
              <span className="name">{v.name}</span>
              <span className="point">20問中{v.count}問正解</span>
            </div>
          )
        })
        }
        <hr/>
        <h3 className="resultSubject">【新婦の理解者】</h3>
        <span style={{ color:"yellow" }}>2位以降は同点の場合のみ発表</span>
        {adaku_counter.sort((a, b) => a.count < b.count ? 1 : -1 ).slice(0,3).map((v, index) => {
          return (
            <div className="rankList">
              <span className="rank">{index + 1}位</span>
              <span className="table">{v.table}</span>
              <span className="name">{v.name}</span>
              <span className="point">20問中{v.count}問正解</span>
            </div>
          )
        })
        }
      </>
    )
  };

    const rankDraw = () => {
    const groupByUser = answereds
      .filter((v) => v.user !== "" && v.table === null)
      .reduce((result, current) => {
        const chkUser = result.find((value) => value.user === current.user);
        if (chkUser) {
          chkUser.point += current.point;
        } else {
          result.push({
            user: current.user,
            point: current.point,
          });
        }
        return result;
      }, []);
    const groupByTable = answereds
      .filter((v) => v.table !== null)
      .reduce((result, current) => {
        const chkUser = result.find((value) => value.table === current.table);
        if (chkUser) {
          chkUser.point += current.point;
        } else {
          result.push({
            table: current.table,
            point: current.point,
          });
        }
        return result;
      }, []);
    const userPointList = users.reduce((result, current) => {
      const personPoint = groupByUser.find((v) => v.user === current.id);
      const tablePoint = groupByTable.find((v) => v.table === current.table);
      let set_point = 0;
      if (personPoint !== undefined) {
        set_point += personPoint.point;
      }
      if (tablePoint !== undefined) {
        set_point += tablePoint.point;
      }
      result.push({
        user: current.id,
        name: current.name,
        table: current.table,
        point: set_point,
      });

      return result;
    }, []);
    const resultHtml = [];
    Object.values(userPointList)
      .filter((v) => v.point !== 0 && v.name !== "")
      .sort((a, b) => (a.point < b.point ? 1 : -1))
      .slice(0,5)
      .map((current, index) => {
        resultHtml.push(
          <>
            <div className="rankList">
              <span className="rank">{index + 1}位</span>
              <span className="table">{current.table}</span>
              <span className="name">{current.name}</span>
              <span className="point">{current.point}pt</span>
            </div>
          </>
        );
        return null;
      });
    return resultHtml;
  };
  return (
    <>
      <div className="resultCotainer">
        <h2>結果画面</h2>
        <h3 className="resultSubject">【個人ポイント】</h3>
        <span style={{ color:"yellow" }}>4位以降は同点の場合のみ発表</span>
        {rankDraw()}
        <hr />
        {rankSinroSinpuDraw()}
      </div>
    </>
  );
};

export default Result;
