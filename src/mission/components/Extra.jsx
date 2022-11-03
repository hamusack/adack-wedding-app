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
                <img src={`${process.env.PUBLIC_URL}/images/sack_icon_normal.jpg`} alt="さっく"></img>
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
                <img src={`${process.env.PUBLIC_URL}/images/sack_icon_normal.jpg`} alt="さっく"></img>
              </div>
              <div className="chatting">
                <div className="says">
                  <p>引き続き、これからも末永くよろしくお願いいたします！</p>
                </div>
              </div>
            </div>
          </div>
          <div className="staffRoles">
            <h3 className="heading07" data-en="Staff!">余興スタッフ</h3>
          </div>
          <div className="staffTitle">ディレクター</div>
            <div class="staffNameList">長嶋 くるみ（みーぬ）</div>
          <div className="staffTitle">司会</div>
          <div class="staffNameList">長嶋 くるみ（みーぬ）</div>
          <div className="staffTitle">花嫁攫之助</div><div class="staffNameList">佐藤 大騎（鏡）</div>
          <div className="staffTitle">スタッフ</div><div class="staffNameList">森國 渉（八索）<br />和田 匠（ぬるー）<br />豊田 啓介（常春）</div>
          <div className="staffTitle">Webシステム</div><div class="staffNameList">和田 匠（ぬるー）<br/>松村 聡士（さっく）</div>
          <div className="staffTitle">Webデザイン</div><div class="staffNameList">杉本 美菜子（あだく）<br/>松村 聡士（さっく）</div>
          <div className="staffTitle">ミッション制作</div><div class="staffNameList">零狐春</div>
          <div className="staffTitle">Ex謎制作</div><div class="staffNameList">松村 聡士（さっく）<br/> 杉本 美菜子（あだく）</div>
          <div className="staffTitle">デバッグ</div><div class="staffNameList">今日来てくれた人を書いていく<br/><br/></div>
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
