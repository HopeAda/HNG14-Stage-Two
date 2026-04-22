import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Details from "./pages/Details/Details";
import Add from "./pages/Add/Add";

const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	return (
		<div className="app">
			<Navbar />
			<Routes location={state?.backgroundLocation || location}>
				<Route element={<Home />} path="/" />
				<Route element={<Details />} path="/details/:id" />
				<Route element={<Add />} path="/add" />
			</Routes>

			{state?.backgroundLocation && (
				<Routes>
					<Route element={<Add />} path="/add" />
				</Routes>
			)}
		</div>
	);
};

export default App;
