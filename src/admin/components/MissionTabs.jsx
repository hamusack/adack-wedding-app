import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formControlClasses } from "@mui/material";
import Const from "constants/common"
import "admin/components/MissionTabs.css"
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { db } from 'common/Firebase'
import { doc , updateDoc} from 'firebase/firestore'


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

function sumPoint(missions) {
  const ret = missions.filter((v) => v.status === 3).reduce((p, v) => { return { point: p.point + Number(v.point) } }, { point: 0 })
  return ret.point;
}

const MissionTabs = ({ missionGroups, missions }) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const groupsTab = (missionGroups) => {
    return missionGroups == null ? "" : missionGroups.map((group, index) => <Tab key={group.id} label={group.name} {...a11yProps(index)} />);
  };
  const tabDetails = (missionGroups, missions) => {
    if (missionGroups == null) {
      return "";
    }

    const editMissionRow = (missions) => {
      if (missions === null) {
        return [{id:""}];
      }
      const edited = [];
      missions.map((v) => {
        const obj = { ...v, status:Const.MISSION_STATUS[v.status],};
        edited.push(obj);
      })
      return edited;
    }

    const selectedRowStatusChange = async (status) => {
      const updateRef = doc(db, 'missions', selectionModel[0])
      await updateDoc(updateRef, { status: status });
    }

    const selectedRowClose = async () => {
      selectedRowStatusChange(1);
    }

    const selectedRowOpen = async () => {
      selectedRowStatusChange(2);
    }

    const selectedRowClear = async () => {
      selectedRowStatusChange(3);
    }

    const groupMissionMap = [];
    missionGroups.forEach((group, group_index) => {
      const groupmission = missions.filter((mission) => mission.group.path.indexOf(group.id) > 0);
      groupMissionMap.push({ group: group, missions: groupmission });
    });
    return groupMissionMap.map((element, index) => {
      const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'status', headerName: 'ｽﾃｰﾀｽ', width: 100 },
        { field: 'title', headerName: 'タイトル', width: 250 },
        { field: 'point', headerName: 'Pt', width: 40 },
        { field: 'missionKind', headerName: '種別', width: 50 },
        { field: 'answer', headerName: 'answer', width: 150 },
        { field: 'answerType', headerName: '回答種別', width: 100 },
      ];
      return (
        <TabPanel key={index} value={value} index={index}>
          <div className="groupInfoContainer">
            <h3>グループ情報</h3>
            <span className="groupCol">Id：{element.group.id}</span>
            <span className="groupCol">名称：{element.group.name}</span>
            <span className="groupCol">現在のポイント：{sumPoint(element.missions)}</span>
            <span className="groupCol">目標ポイント：{element.group.pointArr.join(",")}</span>
            <span className="groupCol">ポイント表示：{Const.GROUP_STATUS[element.group.status]}</span>
            <Button className="groupCol">{element.group.status === 1 ? "ポイントを隠す" : "ポイントを表示する"}</Button>
            <Button className="groupCol">更新する</Button>
          </div>
          <div className="missionListContainer">
            <div className="missionListHeader">
              <h3>ミッション一覧</h3>
            </div>
            <div>
                <Button>ミッション追加</Button>
                <Button>ミッション編集</Button>
                <Button onClick={selectedRowClear}>クリアにする</Button>
                <Button onClick={selectedRowClose}>非公開にする</Button>
                <Button onClick={selectedRowOpen}>公開にする</Button>
              </div>
            <div style={{height:400}}>
              <DataGrid rows={editMissionRow(element.missions)} columns={columns} pageSize={10} rowsPerPageOptions={[10]} disableMultipleSelection={true}   onSelectionModelChange={(id) => setSelectionModel(id)}/>
              </div>
          </div>
        </TabPanel>
      );
    });
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="group tabs">
          {groupsTab(missionGroups)}
        </Tabs>
      </Box>
      {tabDetails(missionGroups, missions)}
    </>
  );
};

export default MissionTabs;
