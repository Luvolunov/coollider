export interface SignLink {
	href: string,
	textContent: string
}
export interface InputData {
	type: string,
	checkData: Function,
	valid: boolean,
	updateFormState?: Function,
	minLen?: number
	maxLen?: number
}
