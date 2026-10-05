import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import { runInNewContext } from "node:vm"
import test from "node:test"
import ts from "typescript"

// Compile the pure TypeScript rules without adding another test dependency.
const source = new URL("../src/utils/survey.ts", import.meta.url)
const { outputText } = ts.transpileModule(readFileSync(source, "utf8"), {
	compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
})
const context = { exports: {}, require: createRequire(fileURLToPath(source)) }
runInNewContext(outputText, context)
const { defaultAnswers, getProgress, questions, surveySchema } = context.exports
const answer = (overrides = {}) => ({ ...defaultAnswers, ...overrides })
const requiredAnswers = answer({
	...Object.fromEntries(questions.filter(q => q.type === "star").map(q => [q.id, "5"])),
	page2_question1: "1",
	page2_question2: "0",
})

test("progress counts answers, excluding info and hidden questions", () => {
	assert.equal(getProgress(answer()).total, 7)
	assert.equal(getProgress(answer()).percentage, 0)
	assert.equal(getProgress(answer({ page3_question2: "   " })).answered, 0)
	assert.equal(getProgress(answer({ page2_question2: "0" })).answered, 1)
	assert.equal(getProgress(requiredAnswers).percentage, 100)
})

test("showing and hiding repair questions changes both counts", () => {
	const shown = { ...requiredAnswers, page2_question2: "1", "2-3-1": "1", "2-3-2": "2" }
	assert.equal(getProgress(shown).total, 9)
	assert.equal(getProgress(shown).answered, 9)
	assert.equal(getProgress({ ...shown, page2_question2: "0" }).answered, 7)
	assert.equal(getProgress({ ...shown, page2_question2: "0" }).total, 7)
	assert.equal(getProgress(answer(Object.fromEntries(questions.filter(q => q.type === "input").map(q => [q.id, "value"])))).answered, 4)
})

test("optional answers enter both counts and leave both counts when cleared", () => {
	const partial = answer({ page2_question2: "0" })
	assert.equal(getProgress(partial).percentage, 14)
	const withOptional = { ...partial, page3_question2: "feedback" }
	assert.equal(getProgress(withOptional).answered, 2)
	assert.equal(getProgress(withOptional).total, 8)
	assert.equal(getProgress(withOptional).percentage, 25)
	const cleared = { ...withOptional, page3_question2: "   " }
	assert.equal(getProgress(cleared).answered, 1)
	assert.equal(getProgress(cleared).total, 7)
	assert.equal(getProgress(cleared).percentage, 14)
	assert.equal(getProgress({ ...requiredAnswers, page3_question2: "feedback" }).percentage, 100)
	assert.equal(getProgress({ ...requiredAnswers, page2_question2: "1" }).percentage, 78)
})

test("required rules ignore hidden questions and permit blank optional answers", () => {
	assert.equal(surveySchema.safeParse(answer()).success, false)
	assert.equal(surveySchema.safeParse(requiredAnswers).success, true)
	const result = surveySchema.safeParse({ ...requiredAnswers, page2_question2: "1" })
	assert.equal(result.success, false)
	assert.equal(result.error.issues.length, 2)
	assert.equal(surveySchema.safeParse({ ...requiredAnswers, page2_question2: "1", "2-3-1": "1", "2-3-2": "2" }).success, true)
})

test("invalid ratings, choices, email and phone are rejected", () => {
	for (const override of [
		{ page1_question1: "6" }, { page1_question1: "0" }, { page1_question1: "2.5" },
		{ page2_question1: "unknown" }, { page2_question2: "unknown" },
		{ page3_question4: "-------" }, { page3_question5: "bad-email" }, { page3_question4: "not-a-phone" },
	]) assert.equal(surveySchema.safeParse({ ...requiredAnswers, ...override }).success, false)
	assert.equal(surveySchema.safeParse({ ...requiredAnswers, page3_question5: "test@example.com", page3_question4: "+886 900000000" }).success, true)
})

test("progress is based on filled answers, not validation or submission", () => {
	const allVisible = { ...requiredAnswers, page3_question2: "feedback", page3_question3: "name", page3_question4: "0900000000", page3_question5: "invalid" }
	assert.equal(getProgress(allVisible).percentage, 100)
	assert.equal(surveySchema.safeParse(allVisible).success, false)
	assert.equal(getProgress({ ...allVisible, page2_question2: "1" }).percentage, 85)
})
