import { useState, useEffect } from 'react';
import 'mission/components/css/Kujibiki.css'

const Kujibiki = ({ mission, clearMission, failedMission, setDialogInfo, answered, setMissionImageTextInfo  }) => {
  const [isTimer, setIsTimer] = useState(false);
  const [result, setResult] = useState(null);

  const results = [
    "daikichi.png",
    "chukichi.png",
    "shokichi.png",
  ];

  useEffect(() => {
    if (answered !== null && answered !== undefined) {
      setMissionImageTextInfo(prev => ({ ...prev, value: answered.text }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered])

  useEffect(() => {
    if (!isTimer) {
      return;
    }
    const timer = setTimeout(() => {
      //some action
      const random = Math.floor( Math.random() * results.length );
      const result = results[random];
      setMissionImageTextInfo(prev => ({ ...prev, value: result }));
      setResult(result);
    }, 3.5 * 1000);

    //クリーンアップ
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimer]);

  useEffect(() => {
    if (result === null) {
      return;
    }
    const timer = setTimeout(() => {

      if (result === "daikichi.png") {
        clearMission(result);
        setDialogInfo({ open:true,title:"ミッション達成！", value:`「${mission.title}」をクリア！\n ポイントを${mission.point}ptゲット！`});
      } else {
        failedMission(result);
        setDialogInfo({ open:true,title:"失敗…", value:`「${mission.title}」\n残念……`});
      }

    }, 3 * 1000);

    //クリーンアップ
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const kuji = () => {
    setMissionImageTextInfo(prev => ({ ...prev, value: "omikuji.gif" }));
    setIsTimer(true);
  }

  return (
  <>
    <div className="KujiInput">
        <button className={answered !== null ? "sendButton visibleFalse" : "sendButton"} disabled={ isTimer } onClick={kuji} >くじを引く</button>
    </div>
  </>
  )
}

export default Kujibiki;