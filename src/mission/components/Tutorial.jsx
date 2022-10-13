import { useState, useEffect } from 'react';
import 'mission/components/css/Tutorial.css';
import { useNavigate } from 'react-router-dom'
import MissionSendButton from 'mission/components/parts/MissionSendButton';
const Tutorial = ({ game,clearMission }) => {
  const [ choiceBtn, setChoiceBtn ] = useState();
  const [ isSend, setIsSend ] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (game === null) {
      return;
    }  else if (game.status !== 1) {
      navigation('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])


  const choiceBtnPushOn = (e) => {
    setChoiceBtn(e.target.value);
  }

  const changeBtnColorClass = (btn) => {
    if (btn === choiceBtn) {
      return "btnSelected";
    } else {
      return "btnNormal";
    }
  }

  const sendAnswer = (e) => {
    if (choiceBtn == null) {
      return;
    }
    clearMission();
    setIsSend(true);
  }

  return (
    <>
      {!isSend &&
      <div className="tutorialInput">
        <button className={changeBtnColorClass("A")} onClick={choiceBtnPushOn} value="A">⭕️</button>
        <button className={changeBtnColorClass("B")} onClick={choiceBtnPushOn} value="B">✕</button>
      </div>
      }
      {!isSend &&
        <div className="sendContainer">
          <p className="attention">回答は一回限り！</p>
          <MissionSendButton answered={null}  disabled={choiceBtn == null} onClick={sendAnswer}>
            送信
          </MissionSendButton>

        </div>
      }
      {isSend &&
        <div>
        <p className="attention">回答が送信されました。新郎を応援しよう！</p>
        </div>
      }
    </>
  )


}

export default Tutorial;