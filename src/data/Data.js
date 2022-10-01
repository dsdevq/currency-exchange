const BASE_URL = "https://api.exchangerate.host/"
export const calculations = async (to, from, amount) => {
	try {
		if (amount <= 0) {
			return 0
		}
		let request = await fetch(
			`${BASE_URL}convert?to=${to}&from=${from}&amount=${amount}`
		)
		let response = await request.json()
		return response.result.toFixed(2)
	} catch (e) {
		console.log("Error", e)
	}
}
