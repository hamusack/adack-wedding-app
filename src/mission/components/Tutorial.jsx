import { useState, useEffect } from 'react';
import 'mission/components/css/Tutorial.css';
import { useNavigate } from 'react-router-dom'
import MissionSendButton from 'mission/components/parts/MissionSendButton';
import ChoiceButton, {selectedButton, normalButton} from 'mission/components/parts/ChoiceButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';

const Tutorial = ({ game, clearMission }) => {
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

  const getButtonStyle = (btn) => {
    if (btn === choiceBtn) {
      return selectedButton;
    }

    return normalButton;
  };


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
          <ChoiceButton style={getButtonStyle("A")} onClick={choiceBtnPushOn} value="A"><FontAwesomeIcon style={{color:"red",pointerEvents:"none"}}  icon={faCircle} /></ChoiceButton>
          <ChoiceButton style={getButtonStyle("B")} onClick={choiceBtnPushOn} value="B"><FontAwesomeIcon style={{fontSize:120,pointerEvents:"none"}} icon={faXmark} /></ChoiceButton>
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
        <p className="attention">回答が送信されました。<br />新郎を応援しよう！</p>
        </div>
      }
    </>
  )


}

export default Tutorial;