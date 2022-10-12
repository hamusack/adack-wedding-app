import MissionRow from 'home/components/MissionRow'

export const GroupMissionList = ({ missions ,isClear}) => {
  const missionRows = missions === null ? [] : missions.map((x) => <MissionRow key={x.id} mission={x} isClear={isClear} />);
  return (
  <>
      <div>
        { missionRows }
    </div>
  </>
  )
}

export default GroupMissionList
