import { useState, useEffect,  } from "react";
import { useNavigate } from 'react-router-dom'
import "mission/components/css/Choice.css";
import MissionSendButton from "mission/components/parts/MissionSendButton";
import ChoiceButton, {selectedButton, correctButton, normalButton} from "mission/components/parts/ChoiceButton"

const Choice = ({ game, mission, clearMission, failedMission, setDialogInfo, answered }) => {
  const [choiceBtn, setChoiceBtn] = useState("");
  const [correctBtn, setCorrectBtn] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    console.log('first');
    if (game === null) {
      return;
    } else if (game.status !== 1 && mission.missionType === 0) {
      navigation('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  const choiceBtnPushOn = (e) => {
    setChoiceBtn(e.target.value);
  };

  const getButtonStyle = (btn) => {
    if (btn === choiceBtn) {
      return selectedButton;
    }

    if (btn === correctBtn) {
      return correctButton;
    }

    return normalButton;
  };

  const sendAnswer = (e) => {
    if (choiceBtn == null) {
      return;
    }
    if (mission.missionType === 0) {
      sendAnswerTutorial(e);
      return;
    }

    if (mission.answer === choiceBtn) {
      clearMission(choiceBtn);
      setDialogInfo({ open: true, title: "正解！", value: `「${mission.title}」をクリア！\n\nポイントを${mission.point}ptゲット！` });
    } else {
      failedMission(choiceBtn);
      setDialogInfo({ open: true, title: "残念！", value: `「${mission.title}」\n不正解……` });
    }
  };

  const sendAnswerTutorial = (e) => {
    if (mission.answer === choiceBtn) {
      clearMission(choiceBtn);
    } else {
      failedMission(choiceBtn);
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
  }, [answered]);

  return (
    <>
      <div className="choiceInput">
        <ChoiceButton style={getButtonStyle("A")} onClick={answered === null ? choiceBtnPushOn : null} value="A">
          A
        </ChoiceButton>
        <ChoiceButton style={getButtonStyle("B")} onClick={answered === null ? choiceBtnPushOn : null} value="B">
          B
        </ChoiceButton>
        <ChoiceButton style={getButtonStyle("C")} onClick={answered === null ? choiceBtnPushOn : null} value="C">
          C
        </ChoiceButton>
        <ChoiceButton style={getButtonStyle("D")} onClick={answered === null ? choiceBtnPushOn : null} value="D">
          D
        </ChoiceButton>
      </div>
      <div className="sendContainer">
        <p className="attention">回答は一回限り！</p>
        <MissionSendButton answered={answered} onClick={sendAnswer} disabled={choiceBtn == null || choiceBtn === "" || answered !== null || game.status === 4}>
          送信
        </MissionSendButton>
      </div>
      {answered !== null && mission.missionType === 0 &&
        <div>
        <p className="attention">回答が送信されました。<br />新郎を応援しよう！</p>
        </div>
      }
    </>
  );
};

export default Choice;
