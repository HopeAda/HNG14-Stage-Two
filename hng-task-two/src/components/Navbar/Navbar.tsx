import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Navbar.css";
import Logo from "../../assets/logo-side.svg";
import ProfilePic from "../ProfilePic/ProfilePic";

const Navbar = () => {
	return (
		<div className="navbar">
			<img src={Logo} alt="" className="logo" />
			<div className="section">
				<ThemeToggle />
				<ProfilePic />
			</div>
		</div>
	);
};

export default Navbar;
