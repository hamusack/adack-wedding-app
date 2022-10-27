import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Const from "constants/common";
import "admin/components/MissionTabs.css";
import { DataGrid , jaJP, GridToolbar} from "@mui/x-data-grid";
import { db } from "common/Firebase";
import { doc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import MissionEditDialog from "admin/components/MissionEditDialog"
import AnsweredEditDialog from "admin/components/AnsweredEditDialog"
import Dialog from '@mui/material/Dialog';
import QRCode from "qrcode.react"

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`group-tabpanel-${index}`} aria-labelledby={`group-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `group-tab-${index}`,
    "aria-controls": `group-tabpanel-${index}`,
  };
}

const MissionTabs = ({ game, missions, answereds, users }) => {
  const [missionEditDialogInfo, setMissionEditDialogInfo] = useState({ open: false });
  const [answeredEditDialogInfo, setAnsweredEditDialogInfo] = useState({ open: false });
  const [selectedMissionRow, setSelectedMissionRow] = useState(null);
  const [selectedAnsweredRow, setSelectedAnsweredRow] = useState(null);
  const [missionEditMode, setMissionEditMode] = useState("new");
  const [answeredEditMode, setAnsweredEditMode] = useState("new");
  const [dialogInfo, setDialogInfo] = useState({ open: false});
  const [qrCodeURL, setqrCodeURL] = useState("https://google.com/");

  const openEditMissionDialog = (mode) => {
    setMissionEditMode(mode);
    setMissionEditDialogInfo({ open: true });
  }
  const openEditAnsweredDialog = (mode) => {
    setAnsweredEditMode(mode);
    setAnsweredEditDialogInfo({ open: true });
  }

  const missionClearEntry = () => {
    setSelectedAnsweredRow({mission:selectedMissionRow.id, point:selectedMissionRow.point});
    openEditAnsweredDialog("new");
  }

  const editMissionRow = () => {
    if (missions === null) {
      return [{ id: "" }];
    }
    const edited = [];
    missions.map((v) => {
      const obj = {
        ...v,
        status: Const.MISSION_STATUS[v.status],
        missionType: Const.MISSION_TYPE[v.missionType],
        answerType: Const.ANSWER_TYPE[v.answerType],
        isImage: v.isImage ? "画像" : "テキスト",
      };
      edited.push(obj);
      return null;
    });
    return edited;
  };


  const createTabPanel = (index,rows, columns, buttons, selectionModelChange,onRowDoubleClick) => {
    return (
      <TabPanel key={index} value={value} index={index}>
        <div className="missionListContainer">
          <div className="tabPanelButtonArea">
            {buttons}
          </div>
          <div style={{ height: 500 ,width: 1400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableMultipleSelection={true}
              onSelectionModelChange={(id) => selectionModelChange(id[0])}
              onRowDoubleClick={onRowDoubleClick}
              localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
              components={{
                Toolbar: GridToolbar,
              }}
              density='compact'
            />
          </div>
        </div>
      </TabPanel>
    )
  }


  const missionListTab = () => {
    const columns = [
      { field: "id", headerName: "ID", width: 220 },
      { field: "status", headerName: "ｽﾃｰﾀｽ", width: 80 },
      { field: "title", headerName: "タイトル", width: 300 },
      { field: "isImage", headerName: "問題表示", width: 100 },
      { field: "value", headerName: "問題", width: 200 },
      { field: "point", headerName: "Pt", width: 40 },
      { field: "missionType", headerName: "種別", width: 100 },
      { field: "answer", headerName: "答え", width: 150 },
      { field: "answerType", headerName: "回答タイプ", width: 100 },
    ];

    const buttons = (
      <>
        <button key={1}  className="gameControlButton" onClick={() => openEditMissionDialog("new")}>ミッション追加</button>
        <button key={2}  className="gameControlButton" onClick={missionClearEntry}>ミッションクリア登録</button>
        <span style={{ fontSize: "0.7em", marginLeft:"20px"}}>※ミッション編集は行ダブルクリック</span>
        </>
  )
    const selectionModelChange = (id) => {
      setSelectedMissionRow(missions.filter((v) => v.id === id)[0]);
    }

    return createTabPanel(0, editMissionRow(), columns,buttons, selectionModelChange, ()=>openEditMissionDialog("update"));
  };

  const editAnsweredRow = () => {
    if (answereds === null) {
      return [{ id: "" }];
    }
    const edited = [];
    answereds.map((v) => {
      if (v.mission === undefined) {
        return null;
      }
      const mission = missions.find((m) => v.mission === m.id);
      const obj = { ...v, result: v.point > 0 ? "成功" : "失敗", mission: mission.title };
      if (obj.user !== "" && users.length > 0) {
        const user = users.find((u) => v.user === u.id);
        obj["user"] = user.name;
      }
      edited.push(obj);
      return null;
    });
    return edited;
  };

  const answeredListTab = () => {
    const columns = [
      { field: "id", headerName: "ID", width: 220 },
      { field: "result", headerName: "結果", width: 100 },
      { field: "mission", headerName: "ミッション", width: 250 },
      { field: "point", headerName: "Pt", width: 150 },
      { field: "table", headerName: "テーブル", width: 100 },
      { field: "user", headerName: "ユーザ", width: 150 },
      { field: "text", headerName: "テキスト", width: 250 },
    ];

    const selectionModelChange = (id) => {
      setSelectedAnsweredRow(answereds.filter((v) => v.id === id)[0]);
    }


    return createTabPanel(1, editAnsweredRow(answereds), columns,
      [<span key={0} style={{ fontSize: "0.7em", marginLeft:"20px"}}>※クリアレコード編集は行ダブルクリック</span>],
      selectionModelChange,
      ()=>openEditAnsweredDialog("update")
    );
  };

  const editUserRow = () => {
    if (users === null || missions === null || answereds === null) {
      return [{ id: "" }];
    }
    const edited = [];
    users.map((v) => {
      const point = answereds.filter(
        (ans) => ans.table === v.table || ans.user === v.id
      ).reduce((p, c) => {
        return { point: Number(p.point) + Number(c.point) }
      }, { point: 0 });
      const obj = {
        ...v,
        point: point.point,
      };
      edited.push(obj);
      return null;
    });
    return edited;
  };

  const usersListTab = () => {
    const columns = [
      { field: "id", headerName: "ID", width: 220 },
      { field: "name", headerName: "名前", width: 100 },
      { field: "table", headerName: "テーブル", width:100 },
      { field: "point", headerName: "個人成績", width:120 },
      { field: "memo", headerName: "メモ", width:200 },
      {
        field: "login", headerName: "ログインURL", width: 400,
        renderCell: (params) =>
          <a href={`/login/${params.row.id}`} target="_blank" rel="noreferrer">{'https://' + window.location.hostname + '/login/' + params.row.id}</a>
      },
      {
        field: "qr", headerName: "QR", width: 100,
        renderCell: (params) =>
          <button onClick={(e) => {
            setDialogInfo({ open: true });
            setqrCodeURL('https://' + window.location.hostname + '/login/' + params.row.id);
          }
          }>QR表示</button>
      }
    ];

    const buttons = (
      <>
        <span style={{ fontSize: "0.7em", marginLeft:"20px"}}>※ユーザ一覧は現状閲覧のみ / 個人成績はテーブル＋個人ミッションの総ポイント</span>
        </>
  )
    const selectionModelChange = (id) => {
    }

    return createTabPanel(2, editUserRow(), columns,buttons, selectionModelChange);
  };

  const missionGroups = [
    { id: 1, name: "ミッション一覧" },
    { id: 2, name: "クリア状況一覧" },
    { id: 3, name: "ユーザ一覧" },
  ];

  const groupsTab = () => {
    return missionGroups == null ? "" : missionGroups.map((group, index) => <Tab key={group.id} label={group.name} {...a11yProps(index)} />);
  };

  const tabDetails = () => {
    return [missionListTab(), answeredListTab(),usersListTab()];
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleDialogClose = (setDialogInfo) => {
    setDialogInfo(prev => {
      return {...prev, open: false}
    });
  }

  const saveMission = async (isUpdate, mission) => {
    if (isUpdate) {
      const missionRef = doc(db, 'missions', mission.id);
      const { id, ...updateMission } = mission;
      await updateDoc(missionRef, updateMission);
    } else {
      await addDoc(collection(db, "missions"), { ...mission,createTime: serverTimestamp() });
    }
  }

  const saveAnswered = async (isUpdate, answered) => {
    if (isUpdate) {
      const answeredRef = doc(db, 'answered', answered.id);
      const { id, ...updateAnswered } = answered;
      await updateDoc(answeredRef, updateAnswered);
    } else {
      await addDoc(collection(db, "answered"), { ...answered,createAt: serverTimestamp() });
    }
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="group tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#dddddd',
              height: '5px'
            }
          }}
        >
          {groupsTab()}
        </Tabs>
      </Box>
      {tabDetails(missions)}
      <MissionEditDialog
            onClose={() => handleDialogClose(setMissionEditDialogInfo)}
            onSave={saveMission}
            open={missionEditDialogInfo['open']}
            mission={selectedMissionRow}
            mode={missionEditMode}
      />
      <AnsweredEditDialog
            onClose={() => handleDialogClose(setAnsweredEditDialogInfo)}
            onSave={saveAnswered}
            open={answeredEditDialogInfo['open']}
            answered={selectedAnsweredRow}
            mode={answeredEditMode}
      />
      <Dialog
        onClose={() => setDialogInfo({open:false})}
        open={dialogInfo['open']}
        PaperProps={{
          style: {
            backgroundColor:"#fff",
            textAlign: "center",
            border: "solid 7px #fff"
          },
        }}
        >
        <div className="qrDialogContainer">
          <QRCode value={qrCodeURL} />
        </div>
      </Dialog>
    </>
  );
};

export default MissionTabs;
