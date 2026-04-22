import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Details from "./pages/Details/Details";

const App = () => {
	return (
		<div className="app">
			<Navbar />
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<Details />} path="/details/:id" />
			</Routes>
		</div>
	);
};

export default App;
