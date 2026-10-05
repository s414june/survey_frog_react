import type { Ref } from "react"
import { FaStar } from "react-icons/fa"
import clsx from "clsx"

type Props = {
	name: string
	value: string
	onChange: (value: string) => void
	onBlur: () => void
	inputRef: Ref<HTMLInputElement>
	starCount?: number
	invalid?: boolean
	describedBy?: string
}

export default function Star({ name, value, onChange, onBlur, inputRef, starCount = 5, invalid, describedBy }: Props) {
	return (
		<div className="flex text-4xl">
			{Array.from({ length: starCount }, (_, index) => {
				const score = String(index + 1)
				return (
					<label key={score} className="cursor-pointer rounded focus-within:ring-2 focus-within:ring-cyan-600">
						<input
							ref={index === 0 ? inputRef : undefined}
							type="radio" name={name} value={score} checked={value === score}
							onChange={() => onChange(score)} onBlur={onBlur}
							aria-label={`${score} 顆星`} aria-invalid={invalid} aria-describedby={describedBy}
							className="sr-only"
						/>
						<FaStar aria-hidden="true" className={clsx("w-12", Number(value) >= index + 1 ? "text-cyan-500" : "text-gray-200")} />
					</label>
				)
			})}
		</div>
	)
}
