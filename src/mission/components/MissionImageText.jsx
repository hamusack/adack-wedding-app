const MissionImageText = ({ mission }) => {
  console.log(mission)
  switch (mission.type) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 6:
        if (mission.isImage) {
        return (
          <>
            <div className="missionVisualContainer">
              <div className="missionImage">
                <img src={`${process.env.PUBLIC_URL}/images/missions/${mission.value}`} alt="謎"></img>
              </div>
              <div className="missionExtraContainer">
                <div className="missionExtraValue">
                    <span >{mission.extraValue.split('\n').map((t, index) => (<span key={index}>{t}<br /></span>))}</span>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="missionVisualContainer">
              <div className="missionTextContainer">
                <div className="missionText">
                  <span >{mission.value.split('\n').map((t,index) => (<span key={index}>{t}<br /></span>))}</span>
                </div>
              </div>
              <div className="missionExtraContainer">
                <div className="missionExtraValue">
                    <span >{mission.extraValue.split('\n').map((t, index) => (<span key={index}>{t}<br /></span>))}</span>
                </div>
              </div>
            </div>
          </>
        );
      }
    case 4:
      return (
        <>
          <div className="missionVisualContainer">
            <div className="KujiImage">
              <img src={`${process.env.PUBLIC_URL}/images/missions/omikuji/${mission.value}`} alt="おみくじ"></img>
            </div>
          </div>
        </>
      );
    case 5:
      return "";
    default:
      return "想定外のミッション種別";
  }
};

export default MissionImageText;
