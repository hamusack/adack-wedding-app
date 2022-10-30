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
        <div id="table">{authInfo.table}卓</div>
        <div id="name">{authInfo.name} さん</div>
        <div id="point">個人ポイント：{point.point} pt</div>
        <img id="headerDeco" src={`${process.env.PUBLIC_URL}/images/header_deco.png`} alt="deco"></img>
      </div>
    </>
  );
}

export default Header;