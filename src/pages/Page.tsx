import { useState } from "react"
import { useLoaderData } from "react-router"
import { useNavigate } from "react-router-dom"
import { nextRoute } from "../utils/pager"
import Card from "../components/Card"
import Button from "../components/Button"
import Star from "../components/survey/Star"
import Select from "../components/survey/Select"
import RadioGroup from "../components/survey/RadioGroup"
import TextInput from "../components/survey/TextInput"
import TextInfo from "../components/survey/TextInfo"
import type { ISurveyParams, ISurveyParamsWithUserInput } from "../types"
import { usePageStore } from "../composable/PageContext"

function App() {
	const { totalPages } = usePageStore()
	const loaderData = useLoaderData()
	const navigate = useNavigate()
	const currentPageNumber = loaderData.pageNumber

	const [surveyData, setSurveyData] = useState<ISurveyParamsWithUserInput[]>(
		loaderData.surveys.map((item: ISurveyParams) => ({
			...item,
			userInput: { hidden: item.hidden ?? false, value: null },
		}))
	)

	const actionButtonElement = (
		pageNumber: number,
		totalPages: number | null
	) => {
		const pageRoute = "/page/" + pageNumber
		if (!totalPages) {
			return null
		}
		return pageNumber < totalPages ? (
			<Button
				message="下一頁"
				onClick={() =>
					navigate(nextRoute(pageRoute, totalPages) ?? "")
				}></Button>
		) : (
			<Button
				message="送出"
				className="w-60"
				onClick={() =>
					navigate(nextRoute(pageRoute, totalPages) ?? "")
				}></Button>
		)
	}

	const getRequiredAsterisk = (required: boolean | undefined) => {
		if (required) {
			return <span className="text-red-500">*</span>
		}
		return null
	}

	const getElementByType = (
		params: ISurveyParamsWithUserInput,
		handleAction:
			| ((value: { action: string; id: string }[]) => void)
			| undefined
	) => {
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
			default:
				break
		}
		return null
	}

	const surveyJsxElement = (
		params: ISurveyParamsWithUserInput,
		index: number,
		handleAction:
			| ((value: { action: string; id: string }[]) => void)
			| undefined
	) => {
		if (params.userInput.hidden) return
		return (
			<div key={index} className="mb-5">
				<h5 className="text-xl font-bold mb-3">
					{params.question}
					{getRequiredAsterisk(params.required)}
				</h5>
				<div>{getElementByType(params, handleAction)} </div>
			</div>
		)
	}

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

	const getSurveyBlocks = () => {
		return surveyData.map((item: ISurveyParamsWithUserInput, index: number) =>
			surveyJsxElement(item, index, handleAction)
		)
	}

	return (
		<>
			<Card>
				<form className="w-full">
					<div className="mb-5">
						<h2 className="text-3xl font-bold before:block before:absolute before:w-2 before:h-10 before:left-0 before:bg-cyan-500">
							{loaderData.title}
						</h2>
						<div className="my-4 question">{getSurveyBlocks()}</div>
					</div>
					<div className="w-full flex justify-center">
						{actionButtonElement(currentPageNumber, totalPages)}
					</div>
				</form>
			</Card>
		</>
	)
}

export default App
