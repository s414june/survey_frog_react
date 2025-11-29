import { Outlet } from "react-router-dom"
import "./App.css"
import Footer from "./components/Footer"

function App() {
	const jsxElement = (
		<>
			<div className="bg-zinc-100 min-h-screen vh-for-mobile">
				<div className="grow pb-20">
					<div className="p-4 w-full flex justify-center">
						<Outlet />
					</div>
				</div>
				<div>
					<Footer />
				</div>
			</div>
		</>
	)
	return jsxElement
}
export default App
