import { useState,useEffect } from "react";
import 'mission/components/css/Riddle.css';
import MissionSendButton from "./parts/MissionSendButton";

const Riddle = ({ game, mission, clearMission, setDialogInfo, answered }) => {
  const WRONG_TEXT = "不正解！";
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (answered !== null && answered !== undefined) {
      setAnswer(answered.text === null || answered.text === undefined ? "" :answered.text);
    } else {
      setAnswer("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered])


  const answerCheck = () => {
    if ( mission.answer.split(",").indexOf(answer) !== -1 ) {
      clearMission(answer);
      setDialogInfo({ open: true, title: "正解！", value: `「${mission.title}」をクリア！\nポイントを${mission.point}ptゲット！` });
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
      <div className="riddleInput">
        <div>
          <input className="riddleAnswer" disabled={answered !== null ||  game.status === 4} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} onFocus={answerClear} />
        </div>
        <div>
          <MissionSendButton answered={answered} onClick={answerCheck} onBlur={answerClear} disabled={answered !== null ||  game.status === 4}>
          送信
          </MissionSendButton>
        </div>
      </div>
    </>
  );
};

export default Riddle;
