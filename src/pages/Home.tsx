import Card from "../components/Card"
import Button from "../components/Button"

function App() {
	return (
		<>
			<Card>
				<div className="mb-5">
					<h1 className="text-cyan-500 text-3xl font-bold mb-2">
						遊客滿意度調查
					</h1>
					<div className="text-lg text-gray-500">
						歡迎蒞臨蛙蛙國家風景區！
						<br />
						誠摯邀請您填寫滿意度問卷，
						<br />
						您的意見是我們進步的動力。
					</div>
					<div className="w-full flex justify-center">
						<Button message="開始" className="w-60"></Button>
					</div>
				</div>
			</Card>
		</>
	)
}

export default App
