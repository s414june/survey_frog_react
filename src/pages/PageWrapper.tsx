// Wrapper component
import { useParams } from "react-router-dom"
import Page from "../pages/Page"

const PageWrapper = () => {
	const { pageNumber } = useParams()

	return <Page key={pageNumber} />
}

export default PageWrapper
