import type { FormEvent } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { useLoaderData, useNavigate } from "react-router"
import Card from "../components/Card"
import Button from "../components/Button"
import Star from "../components/survey/Star"
import Select from "../components/survey/Select"
import RadioGroup from "../components/survey/RadioGroup"
import TextInput from "../components/survey/TextInput"
import TextInfo from "../components/survey/TextInfo"
import pageSettings from "../page-settings.json"
import { getVisibleQuestions, questions, type Answers } from "../utils/survey"

export default function Page() {
	const { pageNumber, title } = useLoaderData() as { pageNumber: number; title: string }
	const navigate = useNavigate()
	const {
		control, register, trigger, handleSubmit,
		formState: { errors, isSubmitting },
	} = useFormContext<Answers>()
	const answers = useWatch({ control }) as Answers
	const visibleIds = new Set(getVisibleQuestions(answers).map((question) => question.id))
	const pageQuestions = questions.filter((question) =>
		question.pageNumber === pageNumber &&
		(question.type === "info" || visibleIds.has(question.id))
	)

	async function submitPage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const fieldNames = pageQuestions.filter((question) => question.type !== "info").map((question) => question.id)
		if (fieldNames.length && !await trigger(fieldNames, { shouldFocus: true })) return
		if (pageNumber < pageSettings.length) {
			navigate(`/page/${pageNumber + 1}`)
		} else {
			await handleSubmit(() => navigate("/end"), (allErrors) => {
				const firstInvalid = questions.find((question) => allErrors[question.id])
				if (firstInvalid) navigate(`/page/${firstInvalid.pageNumber}`)
			})()
		}
	}

	return (
		<Card>
			<form id="survey-form" className="w-full" noValidate onSubmit={submitPage}>
				<h2 className="text-3xl font-bold before:block before:absolute before:w-2 before:h-10 before:left-0 before:bg-cyan-500">{title}</h2>
				<div className="my-4 question">
					{pageQuestions.map((question) => {
						if (question.type === "info") return <div key={question.id} className="mb-5"><TextInfo options={question.options} /></div>
						const error = errors[question.id]?.message
						const errorId = `${question.id}-error`
						const accessibility = {
							"aria-invalid": Boolean(error),
							"aria-describedby": error ? errorId : undefined,
							"aria-required": Boolean(question.required),
						}
						return (
							<fieldset key={question.id} className="mb-5">
								<legend id={`${question.id}-label`} className="text-xl font-bold mb-3">
									{question.question}{question.required ? <span className="text-red-500">*</span> : null}
								</legend>
								{question.type === "star" ? (
									<Controller name={question.id} control={control} render={({ field }) => (
										<Star
											name={field.name} value={field.value}
											onChange={field.onChange} onBlur={field.onBlur}
											inputRef={field.ref} starCount={question.starCount}
											invalid={Boolean(error)} describedBy={error ? errorId : undefined}
										/>
									)} />
								) : null}
								{question.type === "select" ? (
									<Select
										{...register(question.id)} {...accessibility}
										aria-labelledby={`${question.id}-label`}
										options={question.options}
									/>
								) : null}
								{question.type === "radio" ? (
									<Controller name={question.id} control={control} render={({ field }) => (
										<RadioGroup
											name={field.name} ref={field.ref}
											onBlur={field.onBlur} onChange={field.onChange}
											options={question.options} {...accessibility}
											selectedValue={field.value}
										/>
									)} />
								) : null}
								{question.type === "input" ? (
									<TextInput
										{...register(question.id)} {...accessibility}
										aria-labelledby={`${question.id}-label`}
										type={question.validation ?? "text"}
									/>
								) : null}
								{error ? <p id={errorId} role="alert" className="mt-2 text-sm text-red-600">{error}</p> : null}
							</fieldset>
						)
					})}
				</div>
				<div className="w-full flex justify-center"><Button type="submit" disabled={isSubmitting} message={pageNumber < pageSettings.length ? "下一頁" : "送出"} /></div>
			</form>
		</Card>
	)
}
