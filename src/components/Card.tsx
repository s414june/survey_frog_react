import type { ReactNode } from "react"

const Component = ({ children }: { children?: ReactNode }) => {
	return (
		<>
			<div className="block p-6 rounded-lg shadow-lg bg-white max-w-full w-192 relative">
				{children}
			</div>
		</>
	)
}

export default Component
