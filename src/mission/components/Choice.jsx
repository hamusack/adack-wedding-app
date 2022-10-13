import { useState, useEffect } from "react";
import "mission/components/css/Choice.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MissionSendButton from "mission/components/parts/MissionSendButton";
import ChoiceButton, {selectedButton, correctButton, normalButton} from "mission/components/parts/ChoiceButton"

const Choice = ({ mission, clearMission, failedMission, setDialogInfo, answered }) => {
  const [choiceBtn, setChoiceBtn] = useState("");
  const [correctBtn, setCorrectBtn] = useState("");

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

    if (mission.answer === choiceBtn) {
      clearMission(choiceBtn);
      setDialogInfo({ open: true, title: "正解！", value: `「${mission.title}」をクリア！\n\nポイントを${mission.point}ptゲット！` });
    } else {
      failedMission(choiceBtn);
      setDialogInfo({ open: true, title: "残念！", value: `「${mission.title}」\n不正解……` });
    }
  };

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
        <MissionSendButton answered={answered} onClick={sendAnswer} disabled={choiceBtn == null || answered !== null}>
          送信
        </MissionSendButton>
      </div>
    </>
  );
};

export default Choice;
