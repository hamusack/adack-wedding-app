import "mission/components/css/OurComment.css";
import OurCommentParts from "./OurCommentParts";


const OurComment = ({ game , mission }) => {
  const sortComment = () => {
    if (mission.comment_sort === 0) {
      return (
        <>
          <div id="ourComments">
            <OurCommentParts game={game} icon={`sack_icon_${game.status !== 7 ? "normal" : mission.sack_icon_color}.jpg`} comments={mission.comment_s} name="さっく" />
            <OurCommentParts game={game} icon="adaku_icon.jpg" comments={mission.comment_a} name="あだく" />
          </div>
        </>
      )
    } else {
      return (
        <>
          <div id="ourComments">
            <OurCommentParts game={game} icon="adaku_icon.jpg" comments={mission.comment_a} name="あだく" />
            <OurCommentParts game={game} icon={`sack_icon_${game.status !== 7 ? "normal" : mission.sack_icon_color}.jpg`} comments={mission.comment_s} name="さっく" />
          </div>
        </>
      )
    }
  }

  return (
    <>
      {mission.comment_s !== "" || mission.comment_a !== ""
        ? <h2 className="heading07" data-en="Comment!"><div className="heading08">新郎新婦コメント</div></h2>
        : ""
      }
      {sortComment()}
    </>
  );
};

export default OurComment;
