import clsx from "clsx"

const Component = ({
	message,
	className,
	onClick,
}: {
	message?: string
	className?: string
	onClick?: () => void
}) => {
	const baseClasses = [
		"inline-block px-6 py-2.5",
		"text-white font-medium leading-tight uppercase",
		"rounded shadow-md my-3",
		"transition duration-150 ease-in-out",
		"bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-600 active:bg-cyan-700",
		"cursor-pointer select-none",
	]

	return (
		<>
			<button
				type="button"
				className={clsx(baseClasses, className)}
				onClick={onClick}>
				{message}
			</button>
		</>
	)
}

export default Component
