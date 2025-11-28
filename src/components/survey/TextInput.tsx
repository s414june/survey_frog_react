const Component = ({ hidden }: { hidden?: boolean }) => {
	if (hidden) {
		return null
	}
	return (
		<>
			<input className="w-full border border-cyan-500 rounded p-2 px-3 focus:outline-none focus:shadow-no-offset focus:shadow-cyan-500/50" />
		</>
	)
}

export default Component
