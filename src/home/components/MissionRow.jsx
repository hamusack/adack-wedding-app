import { useNavigate } from "react-router-dom"
import 'home/components/MissionRow.css'

export const MissionRow = ({ mission }) => {
  const navigate = useNavigate();
  const moveMission = () => {
    return navigate('/mission', { state: { id: mission.id } });
  }
  return (
    <>
      <div className="missionRow">
        <div className="missionRowPoint">{mission.point}pt</div><div className="missionRowTitle">{mission.title}</div>
        <button className="missionRowButton" onClick={moveMission}>{mission.missionKind === 1 ? "挑戦" : "確認"}</button>
      </div>
    </>
  )
}

export default MissionRow
