import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

const Operations = () => {
	const [savedOperations, setSavedOperations] = useLocalStorage([], 'operations')
	const inputValuePeriod = useRef(null)
	const [activePeriod, setActivePeriod] = useState([])
	const [informer, setInformer] = useState('')
	const [renderData, setRenderData] = useState([])

	let currentDate = new Date()
	let year = String(currentDate.getFullYear())
	let month =
		currentDate.getMonth() < 10
			? String(`0${currentDate.getMonth()}`)
			: Number(currentDate.getMonth() + 1)
	let date =
		currentDate.getDate() < 10 ? String(`0${currentDate.getDate()}`) : Number(currentDate.getDate())

	const renderingOperations = data => {
		setRenderData(data)
		updateInformer(data)
	}

	const deleteOperation = operation => {
		setSavedOperations(savedOperations.filter(item => item.id !== operation.id))
	}

	const onChangeCurrentPeriod = () => getActivePeriod()

	const searchOperations = value => {
		const data = savedOperations.filter(
			item =>
				item.operationDate.includes(value) ||
				item.operationName.toLowerCase().includes(value.toLowerCase()) ||
				item.transactionAmount.includes(value) ||
				item.comment.toLowerCase().includes(value.toLowerCase())
		)

		renderingOperations(data)
	}

	const onChangeSearch = e => {
		const value = e.target.value

		searchOperations(value)
	}

	const updateInformer = data => {
		const amountOfExpenses = () =>
			data.reduce((acc, item) => {
				acc += Number(item.transactionAmount)
				return Number(acc)
			}, 0)

		!data.length
			? setInformer('No saved operations.')
			: setInformer(
					`${data.length} finance operations found for total amount: ${amountOfExpenses()} ₽`
			  )
	}

	const renderedSelectedPeriod = () => {
		if (activePeriod.length) {
			const valueYear = String(inputValuePeriod.current.value.slice(0, 4))
			const valueMonth = String(inputValuePeriod.current.value.slice(5, 7))

			const data = savedOperations.filter(
				item => item.year === valueYear && item.month === valueMonth
			)

			renderingOperations(data)
		} else {
			renderingOperations(savedOperations)
		}
	}

	const getActivePeriod = () => {
		if (inputValuePeriod.current.value.length) {
			setActivePeriod(inputValuePeriod.current.value)
		}

		renderedSelectedPeriod()
	}

	useEffect(() => {
		getActivePeriod()
	}, [activePeriod, savedOperations])

	return (
		<div>
			<div className="pt-[2rem] mb-[1.3rem] flex items-center justify-around flex-col">
				<div className="text-blue-700 font-extrabold self-center break-all mb-4">
					{`Current date: ${date}.${month}.${year}`}
				</div>
			</div>
			<form className=" w-[100%] md:w-[90%] xl:w-[70%] flex flex-col md:flex-row justify-between items-center px-[0.7rem] mx-auto mb-[2rem]">
				<input
					className="w-[100%] md:w-[72%] lg:w-[79%] xl:w-[77%] xxl:w-[80.5%] h-[3rem] p-[10px] bg-[#e8eced] shadow-[0px_5px_10px_2px_rgba(34,60,80,0.2)] border-[2px] border-solid border-[#ffd700] outline-none focus:border-[#39c832] transition-all duration-[0.3s] placeholder:opacity-100 placeholder:text-black rounded-[0.8rem]  mb-[1.3rem] md:mb-0"
					type="search"
					placeholder="Name operation, transaction amount, date..."
					color="red"
					onChange={onChangeSearch}
				/>
				<div>
					<Link
						to={'/add-new-operation'}
						className="mb-2 w-[10rem] h-[3rem] rounded-[0.8rem] bg-purple-800 py-[0.2rem] px-[0.5rem] text-[#ffffff] drop-shadow-sm hover:bg-purple-600 hover:opacity-100 transition-all duration-[0.4s] active:scale-[0.97] flex items-center justify-center"
					>
						+ Add operation
					</Link>
					<Link
						to={'/options'}
						className="w-[10rem] h-[3rem] rounded-[0.8rem] bg-purple-800 py-[0.2rem] px-[0.5rem] text-[#ffffff] drop-shadow-sm hover:bg-purple-600 hover:opacity-100 transition-all duration-[0.4s] active:scale-[0.97] flex items-center justify-center"
					>
						Options
					</Link>
				</div>
			</form>
			<div className="flex flex-col">
				<span className="font-black mb-[0.3rem] w-[100%] text-center inline-block text-red-600">
					Select period:
				</span>
				<input
					ref={inputValuePeriod}
					onChange={onChangeCurrentPeriod}
					type="month"
					className="cursor-pointer font-black w-[9.2rem] relative top-0 right-0 left-0 bottom-0 m-auto mb-3 text-blue-700"
				/>
			</div>
			<p className="text-center font-black mb-[0.5rem]">{informer}</p>
			<div className="w-full md:w-[90%] xl:w-[70%] flex flex-col  px-[0.7rem] mx-auto mb-[3rem]">
				{renderData.map(item => (
					<div
						key={item.id}
						className="flex flex-col py-[2rem] px-[0.5rem] mb-[0.8rem] bg-[lightgrey] rounded-[0.8rem] shadow-md"
					>
						<div>
							<p className="text-red-700 font-extrabold w-[63%] sm:w-[77%] md:w-[81%] self-center break-all">{`${item.day}.${item.month}.${item.year}`}</p>
							<p className="self-center break-all font-extrabold">{`${item.operationName}`}</p>
							<p className="text-red-700 font-extrabold w-[63%] sm:w-[77%] md:w-[81%] self-center break-all font-700">{`${item.transactionAmount} ₽`}</p>
							<p className="text-red-700 font-extrabold w-[63%] sm:w-[77%] md:w-[81%] self-center break-all">{`${item.comment}`}</p>
						</div>
						<div className="flex justify-center items-center">
							<Link
								to={'/edit-operation'}
								state={{
									id: String(item.id),
									operationDate: String(item.operationDate),
									operationName: String(item.operationName),
									transactionAmount: String(item.transactionAmount),
									comment: String(item.comment)
								}}
								className="w-[6rem] h-[2.5rem] rounded-[0.8rem] bg-purple-800 py-[0.2rem] text-[#ffffff] drop-shadow-sm hover:bg-purple-600 hover:opacity-100 transition-all duration-[0.4s] active:scale-[0.97] flex items-center justify-center mr-3"
							>
								Edit
							</Link>
							<button
								onClick={() => deleteOperation(item)}
								className="w-[6rem] h-[2.5rem] rounded-[0.8rem] bg-purple-800 py-[0.2rem] text-[#ffffff] drop-shadow-sm hover:bg-purple-600 hover:opacity-100 transition-all duration-[0.4s] active:scale-[0.97] flex items-center justify-center"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Operations
