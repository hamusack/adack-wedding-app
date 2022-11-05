import 'home/components/Header.css';

const Header = ({ answereds, authInfo }) => {

  const point = answereds.filter(
    (ans) => ans.table === authInfo.table || ans.user === authInfo.userId
  ).reduce((p, c) => {
    return { point: Number(p.point) + Number(c.point) }
  }, { point: 0 });

  return (
    <>
      <div className="HeaderContainer">
        {/* <div className="heading07" data-en={"Table " + authInfo.table} id="table"></div> */}
        <div className="heading07" data-en={"Table " + authInfo.table + "!"} id="name">{authInfo.name}<span className="smallFont">さん</span></div>
        <div id="point">個人ポイント：{point.point} pt</div>
        <img id="headerDeco" src={`${process.env.PUBLIC_URL}/images/header_deco_new.png`} alt="deco"></img>
      </div>
    </>
  );
}

export default Header;