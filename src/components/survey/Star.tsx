import { FaStar } from "react-icons/fa"

const Component = ({
	question,
	required,
	starCount = 5,
}: {
	question?: string
	required?: boolean
	starCount?: number
}) => {
	const starIcons = StarIconsBuilder(starCount)
	return (
		<>
			<div className="mb-5">
				<h5 className="text-xl font-bold mb-3">
					{question}
					{getRequiredAsterisk(required)}
				</h5>
				<div className="flex text-4xl">{starIcons}</div>
			</div>
		</>
	)
}

const StarIconsBuilder = (starCount: number) => {
	const stars = []
	for (let i = 0; i < starCount; i++) {
		stars.push(
			<FaStar
				key={i}
				className="w-12 cursor-pointer text-gray-200"
				onClick={() => console.log(`Star ${i + 1} clicked`)}
			/>
		)
	}
	return stars
}

const getRequiredAsterisk = (required: boolean | undefined) => {
	if (required) {
		return <span className="text-red-500">*</span>
	}
	return null
}

export default Component
