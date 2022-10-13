import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledMissionSendButton = styled(Button)(({ theme }) => ({
  width: 200,
  height:50,
  marginTop: 20,
  backgroundColor: "#030244",
  border: "solid 2px #FFDF04",
  color: "#fff",
  fontSize:"1.4em",
  display: "var(--display)",
}));

const MissionSendButton = ({ answered, onClick, onBlur = null, disabled, children }) => {

  const visibleTrue = {
    "--display": "",
  }

  const visibleFalse = {
    "--display": "none",
  }

  const getButtonStyle = () => {
    if (answered !== null) {
      return visibleFalse
    } else
      return visibleTrue
  }

  return (
    <>
    <StyledMissionSendButton
      style={getButtonStyle()}
      disabled={disabled}
      onClick={onClick}
      onBlur={onBlur}
    >
      {children}
    </StyledMissionSendButton>
    </>
  )
}


export default MissionSendButton;