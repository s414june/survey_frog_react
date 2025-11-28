const Component = ({
	options,
	hidden,
}: {
	question?: string
	required?: boolean
	options?: { label: string; value: any }[]
	hidden?: boolean
}) => {
	if (hidden) {
		return null
	}
	return (
		<>
			<div className="flex">
				<select className="text-lg text-gray-500 w-full border border-cyan-500 p-2 px-3 pr-8 rounded focus:outline-none focus:shadow-no-offset focus:shadow-cyan-500/50 select">
					{getOptionsJsx(options)}
				</select>
			</div>
		</>
	)
}

const getOptionsJsx = (
	options: { label: string; value: any }[] | undefined
) => {
	if (!options) return null
	return options.map((option, index) => (
		<option key={index} value={option.value}>
			{option.label}
		</option>
	))
}

export default Component
