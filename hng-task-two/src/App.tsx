import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Details from "./pages/Details/Details";
import Add from "./pages/Add/Add";
import Edit from "./pages/Edit/Edit";

const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	return (
		<div className="app">
			<Navbar />
			<Routes location={state?.backgroundLocation || location}>
				<Route element={<Home />} path="/" />
				<Route element={<Details />} path="/details/:id" />
				<Route element={<Details />} path="/details/:id" />
				<Route element={<Add />} path="/add" />
				<Route element={<Edit />} path="/edit/:id" />
			</Routes>

			{state?.backgroundLocation && (
				<Routes>
					<Route element={<Add />} path="/add" />
					<Route element={<Edit />} path="/edit/:id" />
				</Routes>
			)}
		</div>
	);
};

export default App;
