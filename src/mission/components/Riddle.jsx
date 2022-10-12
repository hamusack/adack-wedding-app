import { useState,useEffect } from "react";
import 'mission/components/css/Riddle.css';

const Riddle = ({ mission, clearMission, setDialogInfo, answered }) => {
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
      setAnswer("正解！");
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
          <input className="riddleAnswer" disabled={answered !== null} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </div>
        <div>
          <button className={answered !== null ? "sendButton visibleFalse" : "sendButton"} onClick={answerCheck} onBlur={answerClear}>
          送信
          </button>
        </div>
      </div>
    </>
  );
};

export default Riddle;
