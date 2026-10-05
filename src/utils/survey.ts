import { z } from "zod"
import pageSettings from "../page-settings.json"
import type { ISurveyParams } from "../types"

export type Answers = Record<string, string>
export const questions = pageSettings.flatMap((page) =>
	page.surveys.map((survey, index) => ({
		...(survey as ISurveyParams),
		id: (survey as ISurveyParams).id ?? `page${page.pageNumber}_question${index + 1}`,
		pageNumber: page.pageNumber,
	}))
)
export const defaultAnswers: Answers = Object.fromEntries(
	questions.filter((question) => question.type !== "info").map((question) => [question.id, ""])
)

export function getVisibleQuestions(answers: Answers) {
	const hidden = new Map(questions.map((question) => [question.id, question.hidden ?? false]))
	for (const question of questions) {
		if (hidden.get(question.id)) continue
		const selected = question.options?.find((option) =>
			option.value !== undefined && String(option.value) === answers[question.id]
		)
		for (const action of selected?.related ?? []) {
			hidden.set(action.id, action.action === "hide")
		}
	}
	return questions.filter((question) => question.type !== "info" && !hidden.get(question.id))
}

export function getProgress(answers: Answers) {
	const visible = getVisibleQuestions(answers)
	let answered = 0
	let total = 0
	for (const question of visible) {
		const isAnswered = (answers[question.id] ?? "").trim() !== ""
		if (isAnswered) answered++
		if (question.required || isAnswered) total++
	}
	return { answered, total, percentage: total ? Math.round(answered / total * 100) : 0 }
}

export const surveySchema = z.record(z.string(), z.string()).superRefine((answers, ctx) => {
	for (const question of getVisibleQuestions(answers)) {
		const value = (answers[question.id] ?? "").trim()
		let message = ""
		if (!value) {
			if (question.required) message = "此題為必填，請完成作答"
		} else if (question.type === "star") {
			const score = Number(value)
			if (!Number.isInteger(score) || score < 1 || score > (question.starCount ?? 5)) message = "請選擇有效的星星評分"
		} else if (question.type === "select" || question.type === "radio") {
			if (!question.options?.some((option) => String(option.value) === value)) message = "請選擇有效的選項"
		} else if (question.validation === "email" && !z.email().safeParse(value).success) {
			message = "請輸入有效的電子信箱"
		} else if (question.validation === "tel" &&
			(!/^\+?[\d ()-]{7,20}$/.test(value) || value.replace(/\D/g, "").length < 7)) {
			message = "請輸入有效的聯絡電話（至少 7 位數字，可含電話符號）"
		}
		if (message) ctx.addIssue({ code: "custom", path: [question.id], message })
	}
})
