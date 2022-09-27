import { useEffect, useRef, useState } from "react"
import { Form } from "./components/Form"
import { calculations } from "./data/Data"
import { useDebounce } from "./hooks/useDebounce"

function App() {
	const [options] = useState(["EUR", "USD", "UAH"])
	const [from, setFrom] = useState("EUR")
	const [to, setTo] = useState("UAH")
	const [toAmount, setToAmount] = useState(1)
	const [fromAmount, setFromAmount] = useState(1)
	const [amountFrom, setAmountFrom] = useState(true)

	const debouncedToAmount = useDebounce(toAmount, 500)
	const debouncedFromAmount = useDebounce(fromAmount, 500)
	const debouncedAmountFrom = useDebounce(amountFrom, 500)

	const effectRan = useRef(false)

	useEffect(() => {
		if (!effectRan.current) {
			calculations("UAH", "EUR", 1).then((eur) => {
				document.getElementById("eur").innerText = eur
			})
			calculations("UAH", "USD", 1).then((usd) => {
				document.getElementById("usd").innerText = usd
			})
			effectRan.current = true
		}
		if (amountFrom)
			calculations(to, from, fromAmount).then((d) => setToAmount(d))
		else calculations(from, to, toAmount).then((d) => setFromAmount(d))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [to, from, debouncedAmountFrom, debouncedToAmount, debouncedFromAmount])

	const handleFromAmount = (e) => {
		setFromAmount(e.target.value)
		setAmountFrom(true)
	}
	const handleToAmount = (e) => {
		setToAmount(e.target.value)
		setAmountFrom(false)
	}

	return (
		<div className='wrapper'>
			<header className='header'>
				<div className='header__container'>
					<ul className='header__menu menu'>
						<li className='menu__item'>
							1 USD - <span id='usd'></span> UAH
						</li>
						<li className='menu__item'>
							1 EUR - <span id='eur'></span> UAH
						</li>
					</ul>
				</div>
			</header>
			<main className='main'>
				<div className='main__container'>
					<Form
						options={options}
						handleOnChangeSelect={(e) => setFrom(e.target.value)}
						select={from}
						amount={fromAmount}
						handleOnChangeAmount={handleFromAmount}
						heading='Convert from'
					/>
					<Form
						options={options}
						handleOnChangeSelect={(e) => setTo(e.target.value)}
						handleOnChangeAmount={handleToAmount}
						select={to}
						amount={toAmount}
						heading='Convert to'
					/>
				</div>
			</main>
		</div>
	)
}

export default App
