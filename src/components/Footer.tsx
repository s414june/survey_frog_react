function App() {
	return (
		<>
			<footer
				className="w-full bg-white h-20 px-5 shadow-2xl shadow-black flex justify-center items-center bottom-0 fixed"
				v-show="isShow">
				<div className="flex justify-between max-w-full w-192 m-3">
					<div className="flex w-3/4 items-center">
						<div className="w-full bg-gray-200 h-5 rounded-md overflow-hidden relative">
							<div className="bg-cyan-500 h-full duration-500"></div>
						</div>
						<div className="mx-2">100%</div>
					</div>
					<div className="flex">
						<div className="bg-zinc-200 w-10 h-10 rounded-md m-1 p-2 cursor-pointer">
							左
						</div>
						<div className="bg-zinc-200 w-10 h-10 rounded-md m-1 p-2 cursor-pointer">
							右
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default App
