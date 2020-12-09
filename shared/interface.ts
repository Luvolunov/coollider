export interface SignLink {
	readonly href: string,
	readonly textContent: string
}
export interface InputData {
	readonly type: string,
	checkData: Function,
	valid: boolean,
	updateFormState?: Function,
	minLen?: number
	maxLen?: number
}
