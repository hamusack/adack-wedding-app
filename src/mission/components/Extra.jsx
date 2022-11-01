import { useState,useEffect } from "react";
import 'mission/components/css/Extra.css';
import MissionSendButton from "./parts/MissionSendButton";

const Extra = ({ game, mission, clearMission, setDialogInfo, answered, isExClear }) => {
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

  useEffect(() => {
    if (isExClear) {
      document.getElementById("endingComment").scrollIntoView();
    }
  },[isExClear])


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

  const setOurComment = () => {
    if (isExClear) {
      return (
        <>
          <h2 id="endingComment" className="heading07" data-en="Comment!"><div className="heading08">新郎新婦コメント</div></h2>
          <div className="CommentContainer">
            <div className="balloon5">
              <div className="faceicon">
                <img src={`${process.env.PUBLIC_URL}/images/sack_icon.jpg`} alt="さっく"></img>
              </div>
              <div className="chatting">
                <div className="says">
                  <p>これにて、本当にすべてのミッションが終了となります。最後の最後までお楽しみいただき、ありがとうございました！</p>
                </div>
              </div>
            </div>
          </div>
          <div className="CommentContainer">
            <div className="balloon5">
              <div className="faceicon">
                <img src={`${process.env.PUBLIC_URL}/images/adaku_icon.jpg`} alt="あだく"></img>
              </div>
              <div className="chatting">
                <div className="says">
                  <p>これからも私達と遊んでください！私達の家にも来てくださいね！もちろん、私達もお呼ばれすればいつでも皆様のお家に伺わせていただきます！</p>
                </div>
              </div>
            </div>
          </div>
          <div className="CommentContainer">
            <div className="balloon5">
              <div className="faceicon">
                <img src={`${process.env.PUBLIC_URL}/images/sack_icon.jpg`} alt="さっく"></img>
              </div>
              <div className="chatting">
                <div className="says">
                  <p>引き続き、これからも末永くよろしくお願いいたします！</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else { return "" };
  }
  return (
    <>
      <div className="riddleInput">
        <div>
          <input className="riddleAnswer" disabled={answered !== null ||  game.status >= 4} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} onFocus={answerClear} />
        </div>
        <div>
          <MissionSendButton answered={answered} onClick={answerCheck} onBlur={answerClear} disabled={answered !== null ||  game.status >= 4}>
          送信
          </MissionSendButton>
        </div>
      </div>
      {setOurComment()}
    </>
  );
};

export default Extra;