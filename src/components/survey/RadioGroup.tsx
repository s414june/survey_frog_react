import type { IRelatedAction } from "../../types"

const Component = ({
	options,
	name,
	hidden,
	onAction,
}: {
	question?: string
	required?: boolean
	options?: { label: string; value: any; related?: IRelatedAction }[]
	name?: string
	hidden?: boolean
	onAction?: (value: { action: string; id: string }[]) => void
}) => {
	if (hidden) {
		return null
	}
	return (
		<>
			<div className="grid grid-cols-2 gap-4">
				{getRadioJsx(options, name, onAction)}
			</div>
		</>
	)
}

const getRadioJsx = (
	options:
		| { label: string; value: any; related?: IRelatedAction }[]
		| undefined,
	name?: string,
	onAction?: (value: { action: string; id: string }[]) => void
) => {
	if (!options) return null
	return options.map((option, index) => (
		<div
			key={index}
			className="radio-option rounded border border-cyan-500 p-2 px-3 flex">
			<input
				value={option.value}
				name={name}
				type="radio"
				id={"option_" + option.value}
				onChange={() => doAction(option.related, onAction)}
			/>
			<label
				htmlFor={"option_" + option.value}
				className="w-full block px-2 text-lg text-gray-500">
				{option.label}
			</label>
		</div>
	))
}

const doAction = (
	value: any,
	onAction?: (value: { action: string; id: string }[]) => void
) => {
	if (!value) return
	if (!onAction) return
	onAction(value)
}

export default Component
