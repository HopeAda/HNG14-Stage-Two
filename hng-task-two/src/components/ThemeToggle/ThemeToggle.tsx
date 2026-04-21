import "./ThemeToggle.css";
import Moon from "../../assets/moon.svg";
import Sun from "../../assets/sun-dot.svg";
import { useContext } from "react";
import ThemeContext from "../../Context/ThemeContext";

const ThemeToggle = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("Theme context must be within ThemeContextProvider");
	}

	const { theme, toggleTheme } = ctx;
	const toggleThemeHandler = () => {
		toggleTheme();
	};

	return (
		<div className="theme-btn" onClick={toggleThemeHandler}>
			<img src={theme === "light" ? Moon : Sun} alt="" />
		</div>
	);
};

export default ThemeToggle;
