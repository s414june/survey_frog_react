import { useFormContext, useWatch } from "react-hook-form"
import pageSettings from "../page-settings.json"
import { getProgress, type Answers } from "../utils/survey"

export function usePageStore() {
	const { control } = useFormContext<Answers>()
	const answers = useWatch({ control }) as Answers
	return { totalPages: pageSettings.length, ...getProgress(answers) }
}
