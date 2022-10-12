import MissionGroups from 'home/components/MissionGroups'
import GroupMissionList from 'home/components/GroupMissionList'
import { AuthInfoContext, LoggedInContext } from "common/components/AuthContextProvider";
import { useContext } from 'react';
import 'home/home.css';
import { clearMissionFilter } from 'common/CommonFunctions'

const Home = ({ game, missions, answereds }) => {
  const isLoggedIn = useContext(LoggedInContext);
  const [authInfo] = useContext(AuthInfoContext);
  const clearMissions = missions.filter(e => clearMissionFilter(e, answereds, authInfo)).filter(mission => mission.missionType !== 0 && mission.status === 2);
  const nowMissions = missions.filter(e => !clearMissionFilter(e, answereds, authInfo)).filter(mission => mission.missionType !== 0 && mission.status === 2);
  const tutorialMission = missions.filter(mission => mission.missionType === 0);

  if (game.status === 0) {
    return <div>ゲーム開始前です。</div>;
  }

  if (!isLoggedIn) {
    return <div>ログインされておりません。申し訳ございませんがQRコードを読み込み直してください。何度もこの画面が表示される場合、スタッフにお声がけください。</div>
  } else {
    return (
      <>
        <div className="mainContainer">
          {
            game.status !== 1 &&
            <div className="groupContainer">
              <h3 className="SubTitleLabel">現在の達成度</h3>
              <div className="missionGroupsContainer">
                <MissionGroups game={game} missions={missions} answereds={answereds} />
              </div>
            </div>
          }
          <div className="missionContainer">
            <h3 className="SubTitleLabel">ミッション一覧</h3>
            {
              game.status === 1 &&
              <div>
                <GroupMissionList missions={tutorialMission} isClear={false} />
              </div>
            }
            {
              game.status !== 1 &&
              <div>
                <GroupMissionList missions={nowMissions} isClear={false} />
              </div>
            }
            {
              game.status !== 1 &&
              <div>
                <h4>【完了済】</h4>
                <GroupMissionList missions={clearMissions} isClear={true} />
              </div>
            }
            </div>
      </div>
    </>
    )
  }
}

export default Home;