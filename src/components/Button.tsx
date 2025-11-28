import clsx from "clsx"

const Component = ({
	message,
	className,
}: {
	message?: string
	className?: string
}) => {
	const baseClasses = [
		"inline-block px-6 py-2.5",
		"text-white font-medium leading-tight uppercase",
		"rounded shadow-md my-3",
		"transition duration-150 ease-in-out",
		"bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-600 active:bg-cyan-700",
	]

	return (
		<>
			<button type="button" className={clsx(baseClasses, className)}>
				{message}
			</button>
		</>
	)
}

export default Component
