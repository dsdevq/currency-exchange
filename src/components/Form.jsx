import React from "react"

export const Form = ({
	options,
	select,
	handleOnChangeSelect,
	amount,
	handleOnChangeAmount,
	heading,
}) => {
	return (
		<form>
			<fieldset>
				<legend>{heading}</legend>
				<div className='input'>
					<input type='number' value={amount} onChange={handleOnChangeAmount} />
					<select value={select} onChange={handleOnChangeSelect}>
						{options.length &&
							options.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
					</select>
				</div>
			</fieldset>
		</form>
	)
}
