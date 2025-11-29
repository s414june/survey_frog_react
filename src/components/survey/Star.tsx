import { FaStar } from "react-icons/fa"

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
	const stars = []
	for (let i = 0; i < starCount; i++) {
		stars.push(
			<FaStar
				key={i}
				className="w-12 cursor-pointer select-none text-gray-200"
				onClick={() => console.log(`Star ${i + 1} clicked`)}
			/>
		)
	}
	return stars
}

export default Component
