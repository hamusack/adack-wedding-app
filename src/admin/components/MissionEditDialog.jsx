import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import  Switch  from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function MissionEditDialog({ onSave, onClose, open, mission, mode }) {

  let copyMissions = { isImage: false }

  if (mode === "update") {
    copyMissions = { ...mission };
  }

  const changeData = (field, value) => {
    copyMissions[field] = value;
  }

  const onNewSaveMission = () => {
    onSave(false, copyMissions);
    onClose();
  }

  const onUpdateMission = () => {
    onSave(true, copyMissions);
    onClose();
  }

  return (
    <>
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>ミッション編集画面</DialogTitle>
        <div className="missionEditDialogContainer">
          <div className="formContainer">
              <>
              <TextField
                defaultValue={copyMissions.title}
                id="title"
                onChange={(e) => changeData(e.target.id, e.target.value)}
                onBlur={(e) => changeData(e.target.id, e.target.value)}
                fullWidth
                label="タイトル"
                margin="normal"
              />
              <TextField
                defaultValue={copyMissions.status}
                id="status"
                type="number"
                onChange={(e) => changeData(e.target.id, Number(e.target.value))}
                onBlur={(e) => changeData(e.target.id, Number(e.target.value))}
                fullWidth
                label="ステータス"
                margin="normal"
                helperText="1:非公開,2:公開中"
              />
              <TextField
                id="value"
                onChange={(e) => changeData(e.target.id, e.target.value)}
                onBlur={(e) => changeData(e.target.id, e.target.value)}
                defaultValue={copyMissions.value}
                label="問題"
                fullWidth
                margin="normal"
                helperText="問題文 または 画像ファイル名"
                />
              <FormControlLabel control={
                <Switch
                  id="isImage"
                  defaultChecked={copyMissions.isImage}
                  onChange={(e) => changeData(e.target.id, e.target.value === 'on' ? true : false)}
                />
              }
                label="問題は画像で表示"
                style={{marginBottom:"15px"}}
                />
              <TextField
                defaultValue={copyMissions.point}
                id="point"
                type="number"
                onChange={(e) => changeData(e.target.id, Number(e.target.value))}
                onBlur={(e) => changeData(e.target.id, Number(e.target.value))}
                fullWidth
                label="ポイント"
                margin="normal"
              />
              <TextField
                defaultValue={copyMissions.missionType}
                id="missionType"
                type="number"
                onChange={(e) => changeData(e.target.id, Number(e.target.value))}
                onBlur={(e) => changeData(e.target.id, Number(e.target.value))}
                fullWidth
                label="ミッション種別"
                margin="normal"
                helperText="0:チュートリアル,1:回答,2:自由,3:四択,4:くじ,5:同時,6:スタッフ"
              />
              <TextField
                defaultValue={copyMissions.answer}
                id="answer"
                onChange={(e) => changeData(e.target.id, e.target.value)}
                onBlur={(e) => changeData(e.target.id, e.target.value)}
                label="答え"
                fullWidth
                margin="normal"
              />
              <TextField
                id="answerType"
                type="number"
                onChange={(e) => changeData(e.target.id, Number(e.target.value))}
                onBlur={(e) => changeData(e.target.id, Number(e.target.value))}
                defaultValue={copyMissions.answerType}
                label="回答タイプ"
                fullWidth
                margin="normal"
                helperText="1:全体A,2:全体B,3:テーブル,4:個人"
              />
              </>
          </div>
      </div>
        <Button style={{margin:10,height: 40,border:"solid 0.5px #777" }} onClick={mode === "new" ? onNewSaveMission : onUpdateMission}>保存する</Button>
      <Button style={{ margin:10, marginTop:0,height: 40,border:"solid 0.5px #777" }} onClick={onClose}>キャンセル</Button>
      </Dialog>
    </>
  );
}

export default MissionEditDialog;