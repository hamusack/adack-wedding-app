import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const StyledChoiceButton = styled(Button)({
  width: 140,
  height: 140,
  fontSize: "5em",
  backgroundColor: "var(--backgroundColor)",
  color: "#444444",
  "&:hover": {
    background: "var(--backgroundColor)",
  },
  "&:active": {
    background: "var(--backgroundColor)",
  }
});

export const normalButton = {
  "--backgroundColor": "white",
};

export const selectedButton = {
  "--backgroundColor": "pink",
};

export const correctButton = {
  "--backgroundColor": "yellow",
};

const ChoiceButton = ({ style, value, onClick, children }) => {

  return (
  <>
    <StyledChoiceButton style={style} onClick={onClick} value={value}>
      {children}
    </StyledChoiceButton>
  </>
)
}

export default ChoiceButton;