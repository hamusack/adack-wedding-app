import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import { db } from "common/Firebase";
import { deleteDoc, doc } from "firebase/firestore";

function AnsweredEditDialog({ onSave, onClose, open, answered, mode}) {

  let copyAnswered = {  }

  if (mode === "update") {
    copyAnswered = { ...answered };
  } else {
    copyAnswered = { ...answered, text: null, table: null ,user:"" };
  }

  const changeData = (field, value) => {
    copyAnswered[field] = value;
  }

  const onNewSaveAnswered = () => {
    onSave(false, copyAnswered);
    onClose();
  }

  const onUpdateAnswered = () => {
    onSave(true, copyAnswered);
    onClose();
  }

  const onDelete = async () => {
    await deleteDoc(doc(db, "answered", answered.id));
    onClose();
  }

  return (
    <>
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>クリアレコード編集画面</DialogTitle>
        <div className="missionEditDialogContainer">
          <div className="formContainer">
              <>
              <TextField
                defaultValue={copyAnswered.mission}
                id="mission"
                onChange={(e) => changeData(e.target.id, e.target.value)}
                onBlur={(e) => changeData(e.target.id, e.target.value)}
                fullWidth
                label="ミッションID"
                margin="normal"
              />
              <TextField
                defaultValue={copyAnswered.point}
                id="point"
                type="number"
                onChange={(e) => changeData(e.target.id, Number(e.target.value))}
                onBlur={(e) => changeData(e.target.id, Number(e.target.value))}
                fullWidth
                label="ポイント"
                margin="normal"
                helperText="0は失敗扱いとする。1以上は成功"
              />
              <TextField
                defaultValue={copyAnswered.table}
                id="table"
                onChange={(e) => changeData(e.target.id, e.target.value)}
                onBlur={(e) => changeData(e.target.id, e.target.value)}
                label="テーブル"
                fullWidth
                margin="normal"
                helperText="テーブル単位のクリアの場合にA/B/C/D/E/Fで指定"
                />
              <TextField
                defaultValue={copyAnswered.user}
                id="user"
                onChange={(e) => changeData(e.target.id, e.target.value)}
                onBlur={(e) => changeData(e.target.id, e.target.value)}
                fullWidth
                label="ユーザ"
                margin="normal"
                helperText="個人単位のクリアの場合にユーザIDを設定"
              />
              <TextField
                defaultValue={copyAnswered.text}
                id="text"
                onChange={(e) => changeData(e.target.id, e.target.value)}
                onBlur={(e) => changeData(e.target.id, e.target.value)}
                fullWidth
                label="テキスト"
                margin="normal"
                helperText="回答欄などに入力した文字列を保持"
              />
              </>
          </div>
      </div>
        <Button style={{margin:10,height: 40,border:"solid 0.5px #777" }} onClick={mode === "new" ? onNewSaveAnswered : onUpdateAnswered}>保存する</Button>
        {mode !== "new" ? <Button style={{ margin:10, marginTop:0,height: 40,border:"solid 0.5px #777" }} onClick={onDelete}>削除する</Button> : ""}
      <Button style={{ margin:10, marginTop:0,height: 40,border:"solid 0.5px #777" }} onClick={onClose}>キャンセル</Button>
      </Dialog>
    </>
  );
}

export default AnsweredEditDialog;