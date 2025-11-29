import type { IOption } from "../../types"

const Component = ({ options }: { options?: IOption[] }) => {
	if (!options) {
		return null
	}
	return (
		<>
			<div className="flex">
				<div className="w-full text-lg text-gray-500">
					{TextsBuilder(options)}
				</div>
			</div>{" "}
		</>
	)
}

const TextsBuilder = (options: IOption[]) => {
	let textList = []
	for (let i = 0; i < options.length; i++) {
		textList.push(<p key={i}>{options[i].label}</p>)
	}
	return textList
}

export default Component
