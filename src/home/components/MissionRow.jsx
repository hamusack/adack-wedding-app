import { useNavigate } from "react-router-dom"
import 'home/components/MissionRow.css'

export const MissionRow = ({ mission, isClear = false }) => {
  const navigate = useNavigate();
  const moveMission = () => {
    return navigate('/mission', { state: { id: mission.id ,isClear : isClear} });
  }
  return (
    <>
      <div className="missionRow">
        <div className="missionRowPoint">{mission.point}pt</div><div className="missionRowTitle">{mission.title}</div>
        <button className="missionRowButton" onClick={moveMission}>{mission.missionType !== 6 ? "挑戦" : "確認"}</button>
      </div>
    </>
  )
}

export default MissionRow
