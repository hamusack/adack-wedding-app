import MissionRow from 'home/components/MissionRow'

export const GroupMissionList = ({ missionGroup, missions }) => {
  const missionRows = missions === null ? [] : missions.map((x) => <MissionRow key={x.id} mission={x} />);
  return (
  <>
      <div>
        <h4 className="missionGroupName">【{missionGroup.name}】</h4>
        { missionRows }
    </div>
  </>
  )
}

export default GroupMissionList
