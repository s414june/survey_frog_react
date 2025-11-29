import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { router } from "./router"
import { PageProvider } from "./composable/PageContext.tsx"

createRoot(document.getElementById("root")!).render(
	<PageProvider>
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>{" "}
	</PageProvider>
)
