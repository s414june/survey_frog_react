import type { ComponentPropsWithRef } from "react"
import type { IOption } from "../../types"

type Props = ComponentPropsWithRef<"select"> & { options?: IOption[] }

export default function Select({ options, ...props }: Props) {
	return (
		<select {...props} className="text-lg text-gray-500 w-full border border-cyan-500 p-2 px-3 pr-8 rounded focus:outline-none focus:shadow-no-offset focus:shadow-cyan-500/50 select">
			<option value="">請選擇</option>
			{options?.map((option) => <option key={String(option.value)} value={option.value}>{option.label}</option>)}
		</select>
	)
}
