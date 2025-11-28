interface IRelatedAction {
    id: string
    action: string
}

interface IOption {
    label: string; value: any; related?: IRelatedAction
}

interface ISurveyParams {
    id?: string
    type: string
    question: string
    required: boolean
    starCount?: number
    options?: IOption[]
    name?: string
    hidden?: boolean
}

interface IUserInput {
    hidden?: boolean
    value?: any
}

type ISurveyParamsWithUserInput = ISurveyParams & {
    userInput: IUserInput
}

export type { ISurveyParams, IRelatedAction, IUserInput, ISurveyParamsWithUserInput, IOption }