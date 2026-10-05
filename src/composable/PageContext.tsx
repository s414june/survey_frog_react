import type { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { defaultAnswers, surveySchema, type Answers } from "../utils/survey"

export const PageProvider = ({ children }: { children: ReactNode }) => {
	const methods = useForm<Answers>({
		defaultValues: defaultAnswers,
		resolver: zodResolver(surveySchema),
		mode: "onTouched",
	})
	return <FormProvider {...methods}>{children}</FormProvider>
}
