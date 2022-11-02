const OurCommentParts = ({ game, icon, comments, name }) => {
  const onClick = (e) => {
    if (game.status === 7) {
      document.getElementById("changeColor").classList.add("exred");
    }
  }
  const createMarkup = () => {
    return { __html: comments };
  };
  return (
    <>
      {comments !== "" ? (
        <div className="CommentContainer">
          <div className="balloon5">
            <div className="faceicon">
              <img src={`${process.env.PUBLIC_URL}/images/${icon}`} alt={name} onClick={onClick}></img>
            </div>
            <div className="chatting">
              <div className="says">
                <p dangerouslySetInnerHTML={createMarkup()} />
              </div>
            </div>
          </div>
        </div>
      ) : ""}
    </>
  );
};

export default OurCommentParts;
