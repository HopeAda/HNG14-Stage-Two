import "./ThemeToggle.css";
import Moon from "../../assets/moon.svg";

const ThemeToggle = () => {
	return (
		<div className="theme-btn">
			<img src={Moon} alt="" />
		</div>
	);
};

export default ThemeToggle;
