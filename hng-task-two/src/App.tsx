import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

const App = () => {
	return (
		<div className="app">
			<Navbar />
			<Routes>
				<Route element={<Home />} path="/" />
			</Routes>
		</div>
	);
};

export default App;
