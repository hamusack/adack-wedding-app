import { textAlign } from '@mui/system';
import 'mission/components/css/Staff.css';
import { styled } from '@mui/material/styles';
const Staff = ({ mission }) => {

  const AlignCenterDiv = styled('div')({
    textAlign:'center',
  });

  return (
    <>
      <AlignCenterDiv>
        <span>回答確認はスタッフまで！</span>
      </AlignCenterDiv>
    </>
  );
};

export default Staff;
