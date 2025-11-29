import Card from "../components/Card"

function App() {
	return (
		<>
			<Card>
				<div className="mb-5 py-3">
					<h1 className="text-cyan-500 text-3xl font-bold mb-2">
						感謝您！我們收到您的回應囉！
					</h1>
					<div className="text-lg text-gray-500">
						您的回饋是我們成長的動力，
						<br />
						期待下次與您相見！
					</div>
				</div>
			</Card>
		</>
	)
}

export default App
