import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <header className="header">
      <Navigation loggedIn={props.loggedIn} isMain={props.isMain}/>
    </header> 
  );
};

export default Header;