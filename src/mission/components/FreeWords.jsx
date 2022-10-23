import { useState, useEffect } from "react";
import MissionSendButton from "mission/components/parts/MissionSendButton";
import("mission/components/css/FreeWords.css");


const FreeWords = ({ mission, clearMission, setDialogInfo, answered }) => {
  const WRONG_TEXT = "もう少し書いて…";
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (answered !== null &&  answered !== undefined) {
      setAnswer(answered.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered]);

  const answerCheck = () => {
    if (String(answer).trim().length > 10) {
      clearMission(answer);
      setAnswer("");
      setDialogInfo({ open: true, title: "ミッション達成！", value: `「${mission.title}」 をクリア！\nポイントを${mission.point}ptゲット！` });
    } else {
      setAnswer(WRONG_TEXT);
    }
  };

  const answerClear = () => {
    if (answer === WRONG_TEXT) {
      setAnswer("");
    }
  };

  return (
    <>
      <div className="freeWordsInput">
        <textarea className="freeWordsTextArea" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={answered !== null} />
        <div className="sendContainer">
          <MissionSendButton answered={answered} onClick={answerCheck} onBlur={answerClear} >
            送信
          </MissionSendButton>
        </div>
      </div>
    </>
  );
};

export default FreeWords;
