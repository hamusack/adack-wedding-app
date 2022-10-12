class Const {
  GROUP_STATUS = { 1: "表示", 2: "非表示" }
  MISSION_TYPE = {1:"回答" , 2:"自由" ,3:"四択" ,4:"くじ" ,5:"同時" ,6:"スタッフ"}
  IS_IMAGE = { true: "画像", false: "文章" }
  MISSION_STATUS = {1:"非公開" , 2:"公開中"}
  GAME_STATUS = { 0: "イベント開始前", 1: "チュートリアル", 2: "ゲーム本番", 3: "終了N分前", 4: "ゲーム終了", }
  ANSWER_TYPE = { 1: "全体A", 2: "全体B", 3: "テーブル", 4: "個人" }
  getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  }
}

export default new Const();