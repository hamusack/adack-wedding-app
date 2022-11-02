import Draggable from "react-draggable";
import { useWindowDimensions } from "./parts/useWindowDiensions";
import { useState, useEffect } from "react";
import MaskDialog from "common/components/MaskDialog";

const MissionImageTextEx = ({ game, mission, setIsExClear }) => {
  const { width } = useWindowDimensions();
  const DISH_POS = { x: width * 0.89 / 2 - 85, y: 310 };
  const PERSON_POS = { x: width * 0.89 / 2 - 75, y: 200 };
  const DISH_SET_POS = [
    { x: DISH_POS.x + 20, y: 380},
    { x: DISH_POS.x + 150, y: 380},
    { x: DISH_POS.x + 85, y: 380},
  ]
  const FEAD_SEC = 1500;

  const [objectsPos, setObjectsPos] = useState({
       lemon: { x: width * 0.89 / 6 * 1 - 32.5, y: 40, dishSetNo:-1 } ,
       pirahu: { x: width * 0.89 / 6 * 3 - 32.5, y: 0 , dishSetNo:-1 } ,
       rata: { x: width * 0.89 / 6 * 5 - 32.5, y: 10 , dishSetNo:-1 } ,
       curry: { x: width * 0.89 / 6 * 1 - 32.5, y: 150 , dishSetNo:-1 } ,
       hamburg: { x: width * 0.89 / 6 * 3 - 32.5, y: 120 , dishSetNo:-1 } ,
       napori: { x: width * 0.89 / 6 * 5 - 32.5, y: 120 , dishSetNo:-1 } ,
       mon: { x: width * 0.89 / 6 * 1 - 47.5, y: 270 , dishSetNo:-1 } ,
       tonkatsu: { x: width * 0.89 / 6 * 5 - 32.5, y: 200 , dishSetNo:-1 } ,
       omu: { x: width * 0.89 / 6 * 5 - 32.5, y: 300 , dishSetNo:-1 } ,
  });

  const [axis, setAxis] = useState(game.status === 7 ? 'both' : 'none');
  const [exDialogInfo, setExDialogInfo] = useState({ open: false});

  const handleDialogClose = () => {
    setExDialogInfo(prev => {
      setIsExClear(true);
      return {open: false}
    });
  }

  const checkCooking = () => {
      if  (
        objectsPos['tonkatsu'].dishSetNo !== -1 &&
        objectsPos['pirahu'].dishSetNo !== -1 &&
        objectsPos['napori'].dishSetNo !== -1
      ) {
        setAxis('none');
        document.querySelector(`#tonkatsu`).animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: FEAD_SEC,
            fill: 'forwards'
          }
        );
        document.querySelector(`#pirahu`).animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: FEAD_SEC,
            fill: 'forwards'
          }
        );
        document.querySelector(`#napori`).animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: FEAD_SEC,
            fill: 'forwards'
          }
        );
        document.querySelector(`#dish`).animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: FEAD_SEC,
            fill: 'forwards'
          }
        );
        document.querySelector(`#toruko`).animate(
          [
            { opacity: 0 },
            { opacity: 1 }
          ],
          {
            duration: FEAD_SEC+500,
            fill: 'forwards'
          }
        );
        window.setTimeout(function(){
          setExDialogInfo({ open: true });
        }, FEAD_SEC + 1000);
      }
    }

    useEffect(() => {
      checkCooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[objectsPos])

  const onStart = (e, data) => {
    if (axis !== 'none') {
      setObjectsPos({ ...objectsPos, [data.node.id]: { ...objectsPos[data.node.id], dishSetNo: -1 } });
    }
  }

  const onStop = (e, data) => {
    if (axis !== 'none') {
      let newPosition = { x: data.lastX, y: data.lastY, dishSetNo: -1 };
      if (
        data.lastX >= DISH_POS.x - 40
        && data.lastX <= DISH_POS.x + 140
        && data.lastY >= DISH_POS.y - 30
        && data.lastY <= 380
      ) {
        const filterSetFoods = Object.values(objectsPos).filter((values) => values.dishSetNo !== -1).sort((a, b) => a.dishSetNo > b.dishSetNo ? 1 : -1);
        const blankNo = filterSetFoods.reduce((prev, v) => prev === v.dishSetNo ? prev + 1 : prev, 0);
        console.log(filterSetFoods);
        console.log(blankNo);
        newPosition = { x: DISH_SET_POS[blankNo].x - data.node.width / 2, y: DISH_SET_POS[blankNo].y - data.node.height, dishSetNo: blankNo };
      }
      setObjectsPos({ ...objectsPos, [data.node.id]: newPosition });
    }
  }

    return (
      <>
        <div className="missionVisualContainer">
          <div className="missionExtraContainer">
            <div id="missionImageArea" className="exMissionImage">
              <Draggable
                position={{
                  x: objectsPos.lemon.x,
                  y: objectsPos.lemon.y
                }}
                onStop={onStop}
                onStart={onStart}
                axis={axis}
              >

              <img className="foods" id="lemon" src={`${process.env.PUBLIC_URL}/images/missions/ex/lemon.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.pirahu.x,
                y: objectsPos.pirahu.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="pirahu" src={`${process.env.PUBLIC_URL}/images/missions/ex/pirahu.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.rata.x,
                y: objectsPos.rata.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="rata" src={`${process.env.PUBLIC_URL}/images/missions/ex/rata.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.curry.x,
                y: objectsPos.curry.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="curry" src={`${process.env.PUBLIC_URL}/images/missions/ex/curry.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.hamburg.x,
                y: objectsPos.hamburg.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="hamburg" src={`${process.env.PUBLIC_URL}/images/missions/ex/hamburg.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.napori.x,
                y: objectsPos.napori.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="napori" src={`${process.env.PUBLIC_URL}/images/missions/ex/napori.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.mon.x,
                y: objectsPos.mon.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="mon" src={`${process.env.PUBLIC_URL}/images/missions/ex/mon.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.omu.x,
                y: objectsPos.omu.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="omu" src={`${process.env.PUBLIC_URL}/images/missions/ex/omu.png`} alt="謎"></img>
              </Draggable>
              <Draggable
              position={{
                x: objectsPos.tonkatsu.x,
                y: objectsPos.tonkatsu.y
              }}
              onStop={onStop}
              onStart={onStart}
              axis={axis}
              >
              <img className="foods" id="tonkatsu" src={`${process.env.PUBLIC_URL}/images/missions/ex/tonkatsu.png`} alt="謎"></img>
              </Draggable>
              <Draggable
                defaultPosition={{
                x: PERSON_POS.x,
                y: PERSON_POS.y,
                }}
                axis='none'
              >
                <img className="exImage" src={`${process.env.PUBLIC_URL}/images/missions/ex/eat.png`} alt="人"></img>
              </Draggable>
              <Draggable
                defaultPosition={{
                x: DISH_POS.x,
                y: DISH_POS.y,
                }}
                axis='none'
              >
                <img className="exImage" id="dish" src={`${process.env.PUBLIC_URL}/images/missions/ex/dish.png`} alt="皿"></img>
              </Draggable>
              <Draggable
                defaultPosition={{
                x: DISH_POS.x + 20,
                y: DISH_POS.y,
                }}
                axis='none'
              >
                <img className="exImage" id="toruko" src={`${process.env.PUBLIC_URL}/images/missions/ex/toruko.png`} alt="皿"></img>
              </Draggable>
            </div>
          </div>
          <div className="missionTextContainer">
            <div className="missionText">
              <span >{mission.value.split('\n').map((t,index) => (<span key={index}>{t}<br /></span>))}</span>
            </div>
          </div>
        </div>
        <MaskDialog
            onClose={handleDialogClose}
            open={exDialogInfo['open']}
            title={'エクストラミッションクリア'}
            value={'トルコライスを作成しました！'}
          />
      </>
    );
};

export default MissionImageTextEx;
