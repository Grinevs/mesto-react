import logo from '../images/vector.svg'

function Header() {
  return(
    <header className="header">
     <img className="logo" src={logo} alt="Логотип сайта" />
    </header>
  )
}

export default Header;