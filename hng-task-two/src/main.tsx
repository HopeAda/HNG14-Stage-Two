import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeContextProvider } from "./Context/ThemeContext.tsx";
import { DataContextProvider } from "./Context/DataContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<DataContextProvider>
				<ThemeContextProvider>
					<App />
				</ThemeContextProvider>
			</DataContextProvider>
		</BrowserRouter>
	</StrictMode>,
);
