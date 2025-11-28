import Card from "../components/Card"
import Button from "../components/Button"
import { useLoaderData } from "react-router"
import Star from "../components/survey/Star"
import Select from "../components/survey/Select"
import RadioGroup from "../components/survey/RadioGroup"
import TextInput from "../components/survey/TextInput"
import TextInfo from "../components/survey/TextInfo"
import pageSettings from "../page-settings.json"
import type { ISurveyParams, ISurveyParamsWithUserInput } from "../types"
import { useState } from "react"

function App() {
	const loaderData = useLoaderData()
	const currentPageNumber = loaderData.pageNumber

	const [surveyData, setSurveyData] = useState<ISurveyParamsWithUserInput[]>(
		() =>
			loaderData.surveys.map((item: ISurveyParams) => ({
				...item,
				userInput: { hidden: item.hidden ?? false, value: null },
			}))
	)

	const handleAction = (valueList: { action: string; id: string }[]) => {
		setSurveyData((prev) => {
			const newData = prev?.map((item) => {
				valueList.forEach((value) => {
					if (item.id === value.id) {
						const newUserInput = item.userInput || {}
						if (value.action === "show") {
							newUserInput.hidden = false
						} else if (value.action === "hide") {
							newUserInput.hidden = true
						}
						return { ...item, userInput: newUserInput }
					}
				})
				return item
			})
			return newData
		})
	}

	if (!surveyData) {
		return null
	}
	const surveyBlocks = surveyData.map((item: ISurveyParamsWithUserInput) =>
		surveyJsxElement(item, handleAction)
	)

	return (
		<>
			<Card>
				<form className="w-full">
					<div className="mb-5">
						<h2 className="text-3xl font-bold before:block before:absolute before:w-2 before:h-10 before:left-0 before:bg-cyan-500">
							{loaderData.title}
						</h2>
						<div className="my-4 question">{surveyBlocks}</div>
					</div>
					<div className="w-full flex justify-center">
						{actionButtonElement(currentPageNumber)}
					</div>
				</form>
			</Card>
		</>
	)
}

const surveyJsxElement = (
	params: ISurveyParamsWithUserInput,
	handleAction: ((value: { action: string; id: string }[]) => void) | undefined
) => {
	const getElementByType = () => {
		switch (params.type) {
			case "star":
				return <Star question={params.question} required={params.required} />
			case "select":
				return (
					<Select
						question={params.question}
						required={params.required}
						options={params.options}
						hidden={params.userInput.hidden ?? params.hidden}
					/>
				)
			case "radio":
				return (
					<RadioGroup
						question={params.question}
						required={params.required}
						options={params.options}
						name={params.name}
						hidden={params.userInput.hidden ?? params.hidden}
						onAction={handleAction}
					/>
				)

			case "input":
				return <TextInput hidden={params.userInput.hidden ?? params.hidden} />

			case "info":
				return <TextInfo options={params.options} />
		}
	}
	if (params.userInput.hidden ?? params.hidden) {
		return null
	}
	return (
		<>
			<div className="mb-5">
				<h5 className="text-xl font-bold mb-3">
					{params.question}
					{getRequiredAsterisk(params.required)}
				</h5>
				<div>{getElementByType()} </div>
			</div>
		</>
	)
}

const actionButtonElement = (pageNumber: number) => {
	return pageNumber < pageSettings.length ? (
		<Button message="下一頁"></Button>
	) : (
		<Button message="送出" className="w-60"></Button>
	)
}

const getRequiredAsterisk = (required: boolean | undefined) => {
	if (required) {
		return <span className="text-red-500">*</span>
	}
	return null
}

export default App
