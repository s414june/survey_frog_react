import { FaStar } from "react-icons/fa"
import clsx from "clsx"
import { useState } from "react"

const Component = ({
	starCount = 5,
}: {
	question?: string
	required?: boolean
	starCount?: number
}) => {
	const starIcons = StarIconsBuilder(starCount)
	return (
		<>
			<div className="flex text-4xl">{starIcons}</div>
		</>
	)
}

const StarIconsBuilder = (starCount: number) => {
	const [userInputIndex, setUserInputIndex] = useState<null | number>(null)
	const fillStars = (starIndex: number) => {
		return userInputIndex && userInputIndex >= starIndex
	}
	const stars = []
	for (let i = 0; i < starCount; i++) {
		stars.push(
			<FaStar
				key={i}
				className={clsx("w-12 cursor-pointer select-none", {
					"text-cyan-500": fillStars(i),
					" text-gray-200": !fillStars(i),
				})}
				onClick={() => setUserInputIndex(i)}
			/>
		)
	}
	return stars
}

export default Component
