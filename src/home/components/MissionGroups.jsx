import 'home/components/MissionGroups.css';

export const MissionGroups = ({ game, missions, answereds }) => {

  const nowPoint = () => {
    if (answereds === null) {
      return 0;
    }
    let retPoint = 0;
    answereds.map((v) => retPoint += Number(v.point));
    if (game.status >= 3) {
      return '???';
    } else {
      return retPoint;
    }
  }
  const nextPoint = () => {
    console.log('nextPoint')
    console.log(game.status)
    const nextP = game.pointArr.find((value) => value > nowPoint())
    if (game.status >= 3) {
      return '????'
    }
    if (nextP === game.pointArr[-1]) {
      return '????'
    }

    return nextP
  }

  return (
  <>
    <div className="missionGroups">
        <div className="missionGroupPoints">
          <span className="missionNowPoint">{nowPoint()}</span>pt<span className="missionNextPoint">next:{ nextPoint() }pt</span>
        </div>
    </div>
  </>
  )
}

export default MissionGroups
