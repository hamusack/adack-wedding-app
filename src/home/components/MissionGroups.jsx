import 'home/components/MissionGroups.css';

export const MissionGroups = ({ missionGroup }) => {
  const nextPoint = () => {
    return missionGroup.pointArr.find((value) => value > missionGroup.nowPoint)
  }
  return (
  <>
    <div className="missionGroups">
        <div className="missionGroupName">{missionGroup.name}ミッション</div>
        <div className="missionGroupPoints">
          <span className="missionNowPoint">{missionGroup.nowPoint}</span>pt<span className="missionNextPoint">next:{ nextPoint() }pt</span>
        </div>
    </div>
  </>
  )
}

export default MissionGroups
