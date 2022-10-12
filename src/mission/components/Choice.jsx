import { useState, useEffect } from 'react';
import 'mission/components/css/Choice.css';

const Choice = ({ mission, clearMission, failedMission, setDialogInfo, answered}) => {
  const [ choiceBtn, setChoiceBtn ] = useState();
  const [ correctBtn, setCorrectBtn ] = useState();
  const choiceBtnPushOn = (e) => {
    setChoiceBtn(e.target.value);
  }

  const changeBtnColorClass = (btn) => {
    let retClass = "";
    if (btn === choiceBtn) {
      retClass = "btnSelected";
    } else {
      retClass = "btnNormal";
    }

    if (btn === correctBtn) {
      retClass += " btnCorrect";
    }

    return retClass;
  }

  const sendAnswer = (e) => {
    if (choiceBtn == null) {
      return;
    }

    if (mission.answer === choiceBtn) {
      clearMission(choiceBtn);
      setDialogInfo({ open:true,title:"正解！", value:`「${mission.title}」をクリア！\n\nポイントを${mission.point}ptゲット！`});
    } else {
      failedMission(choiceBtn);
      setDialogInfo({ open:true,title:"残念！", value:`「${mission.title}」\n不正解……`});
    }
  }

  useEffect(() => {
    if (answered !== null && Object.keys(answered).length !== 0) {
      setChoiceBtn(answered.text);
      if (answered.text !== mission.answer) {
        setCorrectBtn(mission.answer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered])

  return (
  <>
      <div className="choiceInput">
        <div>
          <button className={changeBtnColorClass("A")} onClick={answered === null ? choiceBtnPushOn : null}  value="A">A</button>
          <button className={changeBtnColorClass("B")} onClick={answered === null ? choiceBtnPushOn : null}  value="B">B</button>
          <button className={changeBtnColorClass("C")} onClick={answered === null ? choiceBtnPushOn : null} value="C">C</button>
          <button className={changeBtnColorClass("D")} onClick={answered === null ? choiceBtnPushOn : null} value="D">D</button>
        </div>
      </div>
      <div className="sendContainer">
        <p className="attention">回答は一回限り！</p>
        <button className={answered !== null ? "sendButton visibleFalse" : "sendButton"} disabled={choiceBtn == null || answered !== null} onClick={sendAnswer}>送信</button>
      </div>
  </>
  )
}

export default Choice;