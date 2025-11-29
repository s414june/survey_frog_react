import { createContext, useContext } from "react"
import pageSettings from "../page-settings.json"

type PageState = {
	totalPages: number | null
	setTotalPages: (value: number) => void
}

const PageContext = createContext<PageState | null>(null)

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
	const totalPages = pageSettings.length ?? 0

	return (
		<PageContext.Provider
			value={{
				totalPages,
				setTotalPages: () => {},
			}}>
			{children}
		</PageContext.Provider>
	)
}

export const usePageStore = () => {
	const ctx = useContext(PageContext)
	if (!ctx) throw new Error("usePageStore must be used inside PageProvider")
	return ctx
}
