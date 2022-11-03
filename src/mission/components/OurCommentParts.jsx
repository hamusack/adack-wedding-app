const OurCommentParts = ({ game, icon, comments, name }) => {
  const onClick = (e) => {
    if (game.status === 7 && name=== "さっく") {
      const dom = document.getElementById("changeColor");
      if (dom !== null) {
        dom.classList.add("exred");
      }
    }
  }
  const createMarkup = () => {
    return { __html: comments };
  };
  return (
    <>
      {comments !== "" ? (
        <div className="CommentContainer">

        <div className="sb-box">
            <div className="icon-img icon-img-left">
              <img src={`${process.env.PUBLIC_URL}/images/${icon}`} alt={name} style={{ width: 70, height: 70 }} onClick={onClick}></img>
            </div>
            <div className="sb-side sb-side-left">
                <div className="sb-txt sb-txt-left" dangerouslySetInnerHTML={createMarkup()}>
                </div>
            </div>
          </div>

        </div>
      ) : ""}
    </>
  );
};

export default OurCommentParts;
