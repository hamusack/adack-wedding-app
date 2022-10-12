
import { serverTimestamp} from 'firebase/firestore'

export const createAnswerdRecord = (mission, userId, userTable, text, success) => {
  return {
    mission: mission.id,
    user: userId,
    table: mission.answerType === 3 ? userTable : null ,
    point: success ? Number(mission.point) : 0 ,
    text: text,
    createdAt: serverTimestamp()
  }
}

export const clearMissionFilter = (v, answereds, authInfo) => {
  switch (v.answerType) {
    case 1:
    case 2:
      return answereds.filter((answered) => answered.mission === v.id).length > 0;
    case 3:
      return answereds.filter((answered) => answered.mission === v.id && answered.table === authInfo.table ).length > 0;
    case 4:
      return answereds.filter((answered) => answered.mission === v.id && answered.user === authInfo.userId).length > 0;
    default:
      return true;
  }
};
