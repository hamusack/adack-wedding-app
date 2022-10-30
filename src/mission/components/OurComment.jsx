import "mission/components/css/OurComment.css";

const OurComment = ({ mission }) => {
  return (
    <>
      <h2 className="heading07" data-en="Comment!"><div className="heading08">新郎新婦コメント</div></h2>
      {mission.comment_s !== "" ? (
        <div className="CommentContainer">
          <div className="balloon5">
            <div className="faceicon">
              <img src={`${process.env.PUBLIC_URL}/images/sack_icon.jpg`} alt="さっく"></img>
            </div>
            <div className="chatting">
              <div className="says">
                <p>{mission.comment_s}</p>
              </div>
            </div>
          </div>
        </div>
      ) : ""
      }
      {mission.comment_a !== "" ? (
        <div className="CommentContainer">
          <div className="balloon5">
            <div className="faceicon">
              <img src={`${process.env.PUBLIC_URL}/images/adaku_icon.jpg`} alt="あだく"></img>
            </div>
            <div className="chatting">
              <div className="says">
                <p>{mission.comment_a}</p>
              </div>
            </div>
          </div>
        </div>
      ) : ""
      }
    </>
  );
};

export default OurComment;
