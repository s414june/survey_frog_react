import type { ComponentPropsWithRef } from "react"
import type { IOption } from "../../types"

type Props = ComponentPropsWithRef<"input"> & { options?: IOption[]; selectedValue: string }

export default function RadioGroup({ options, selectedValue, ...props }: Props) {
	return (
		<div className="grid grid-cols-2 gap-4">
			{options?.map((option, index) => (
				<label key={String(option.value)} className="radio-option rounded border border-cyan-500 p-2 px-3 flex">
					<input {...props} ref={index === 0 ? props.ref : undefined} type="radio" value={option.value} checked={selectedValue === String(option.value)} />
					<span className="w-full block px-2 text-lg text-gray-500">{option.label}</span>
				</label>
			))}
		</div>
	)
}
