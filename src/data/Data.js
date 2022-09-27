const BASE_URL = "https://api.apilayer.com/exchangerates_data/"
export const calculations = async (to, from, amount) => {
	try {
		if (amount <= 0) {
			return 0
		}
		let request = await fetch(
			`${BASE_URL}convert?to=${to}&from=${from}&amount=${amount}`,
			{
				method: "GET",
				headers: { apikey: "VcD92flcFtvuHpkOJIH1E33e5MD18vXf" },
			}
		)
		let response = await request.json()
		return response.result.toFixed(2)
	} catch (e) {
		console.log("Error", e)
	}
}
