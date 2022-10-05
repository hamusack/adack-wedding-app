import MissionGroups from 'home/components/MissionGroups'
import GroupMissionList  from 'home/components/GroupMissionList'
import { LoggedInContext } from "common/components/AuthContextProvider";
import { useContext } from 'react';
import 'home/home.css';

const Home = ({ missions, missionGroups }) => {
  const isLoggedIn = useContext(LoggedInContext);
  const missionGroupsTag = missionGroups === null ? [] : missionGroups.map(x => <MissionGroups key={x.group} missionGroup={x} />);
  const groupMissionListTag = (missionGroups === null || missions === null) ? [] : missionGroups.map((x) => {
    const element = missions.filter(v => x.group === v.group.path);
    return <GroupMissionList key={x.group} missionGroup={x} missions={element} />
  })
  if (!isLoggedIn) {
    return <div>ログインされておりません。申し訳ございませんがQRコードを読み込み直してください。何度もこの画面が表示される場合、スタッフにお声がけください。</div>
  } else {
    return (
      <>
        <div className="mainContainer">
          <div className="groupContainer">
            <h3 className="SubTitleLabel">現在の達成度</h3>
            <div className="missionGroupsContainer">
              {missionGroupsTag}
            </div>
          </div>
          <div className="missionContainer">
            <h3 className="SubTitleLabel">ミッション一覧</h3>
            {groupMissionListTag}
          </div>
      </div>
    </>
    )
  }
}

export default Home;