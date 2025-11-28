import Card from "../components/Card"
import Button from "../components/Button"
import { useLoaderData } from "react-router"
import Star from "../components/survey/Star"
import pageSettings from "../page-settings.json"

interface ISurveyParams {
	type: string
	question: string
	required: boolean
	starCount?: number
}

function App() {
	const loaderData = useLoaderData()
	const currentPageNumber = loaderData.pageNumber
	const surveyBlocks = loaderData.surveys.map((item: ISurveyParams) =>
		surveyJsxElement(item)
	)

	return (
		<>
			<Card>
				<form className="w-full">
					<div className="mb-5">
						<h2 className="text-3xl font-bold before:block before:absolute before:w-2 before:h-10 before:left-0 before:bg-cyan-500">
							{loaderData.title}
						</h2>
						<div v-for="block, bIndex in page.blocks" className="my-4 question">
							{surveyBlocks}
						</div>
					</div>
					<div className="w-full flex justify-center">
						{actionButtonElement(currentPageNumber)}
					</div>
				</form>
			</Card>
		</>
	)
}

const surveyJsxElement = (params: ISurveyParams) => {
	switch (params.type) {
		case "star":
			return <Star question={params.question} required={params.required} />
	}
}

const actionButtonElement = (pageNumber: number) => {
	return pageNumber < pageSettings.length ? (
		<Button message="下一頁"></Button>
	) : (
		<Button message="送出" className="w-60"></Button>
	)
}

export default App
