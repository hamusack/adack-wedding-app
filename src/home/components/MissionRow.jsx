import { useNavigate } from "react-router-dom"
import 'home/components/MissionRow.css'
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

export const MissionRow = ({ mission, isClear = false }) => {
  const navigate = useNavigate();

  const MissionRowButton = styled(Button)(({ theme }) => ({
    width: 80,
    marginRight:10,
    backgroundColor: "#030244",
    border:"solid 1px #FFDF04",
    color:"#FFF"
  }));

  const moveMission = () => {
    return navigate('/mission', { state: { id: mission.id ,isClear : isClear} });
  }
  return (
    <>
      <div className="missionRow">
        <div className="missionRowPoint">{mission.point}pt</div><div className="missionRowTitle">{mission.title}</div>
        <MissionRowButton className="missionRowButton" onClick={moveMission}>{mission.missionType !== 6 ? "挑戦" : "確認"}</MissionRowButton>
      </div>
    </>
  )
}

export default MissionRow
