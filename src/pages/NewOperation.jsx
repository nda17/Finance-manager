import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

const NewOperation = () => {
	const [isValid, setIsValid] = useState('')
	const [informer, setInformer] = useState('Enter data:')
	const [operations, setOperations] = useLocalStorage([], 'operations')
	const [complete, setComplete] = useState(false)
	const navigate = useNavigate()

	const operationDate = useRef(null)
	const operationName = useRef(null)
	const transactionAmount = useRef(null)
	const comment = useRef(null)

	let currentDate = new Date()
	let year = currentDate.getFullYear()
	let month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth()}` : currentDate.getMonth()
	let date = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()

	const validateOperationDate = () => {
		if (operationDate.current.value.length !== 0) {
			operationDate.current.style.borderColor = '#44c47c'
			return true
		} else {
			operationDate.current.style.borderColor = '#eb4034'
			return false
		}
	}

	const validateOperationName = () => {
		if (operationName.current.value.length !== 0) {
			operationName.current.style.borderColor = '#44c47c'
			return true
		} else {
			operationName.current.style.borderColor = '#eb4034'
			return false
		}
	}

	const validateTransactionAmount = () => {
		const regex = new RegExp('^[0-9-.]+$')
		if (regex.test(transactionAmount.current.value)) {
			setIsValid(true)
			transactionAmount.current.style.borderColor = '#44c47c'
			return true
		} else {
			setIsValid(false)
			transactionAmount.current.style.borderColor = '#eb4034'
			return false
		}
	}

	const validateComment = () => {
		if (comment.current.value.length !== 0) {
			comment.current.style.borderColor = '#44c47c'
		} else {
			comment.current.style.borderColor = 'grey'
		}
	}

	const validate = () => {
		validateOperationDate()
		validateOperationName()
		validateTransactionAmount()
		validateComment

		if (validateOperationDate() && validateOperationName() && validateTransactionAmount()) {
			return true
		}
	}

	const saveOperation = data => {
		setOperations([data, ...operations])
	}

	const resetForm = () => {
		setInformer('Enter data:')
		operationDate.current.value = ''
		operationDate.current.style.borderColor = 'grey'
		operationName.current.value = ''
		operationName.current.style.borderColor = 'grey'
		transactionAmount.current.value = ''
		transactionAmount.current.style.borderColor = 'grey'
		comment.current.value = ''
		comment.current.style.borderColor = 'grey'
	}

	const redirect = () => {
		setComplete(true)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (validate()) {
			const data = {
				id: Math.random().toFixed(5).toString().split('.')[1],
				day: operationDate.current.value.slice(8, 11),
				month: operationDate.current.value.slice(5, 7),
				year: operationDate.current.value.slice(0, 4),
				operationDate: operationDate.current.value,
				operationName: operationName.current.value,
				transactionAmount: transactionAmount.current.value,
				comment: comment.current.value.length ? comment.current.value : 'No comments'
			}

			saveOperation(data)
			resetForm()
			redirect()
		} else {
			setInformer('Correct mistakes!')
		}
	}

	useEffect(() => {
		validate()
		if (
			!operationDate.current.value.length &&
			!operationName.current.value.length &&
			!transactionAmount.current.value.length &&
			!comment &&
			!isValid
		) {
			setInformer('Enter data:')
		}

		if (
			(operationName.current.value.length && !transactionAmount.current.value.length) ||
			(!operationName.current.value.length && transactionAmount.current.value.length && !isValid)
		) {
			console.log(operationName.current.value)
			setInformer('Correct mistakes!')
		}

		if (
			operationDate.current.value.length &&
			operationName.current.value.length &&
			transactionAmount.current.value.length &&
			isValid
		) {
			setInformer('All data is valid.')
		}
	}, [isValid])

	useEffect(() => {
		complete ? navigate('/#') : null
	}, [complete])

	return (
		<form className="w-[262px] flex flex-col items-center mx-auto py-[1rem]">
			<p className="pt-[1rem] font-bold mb-[1rem]">{informer}</p>
			<div className="flex flex-col w-[100%]">
				<div className="flex">
					<input
						ref={operationDate}
						defaultValue={`${year}-${month + 1}-${date}`}
						type="date"
						required="required"
						className="cursor-pointer w-[100%] h-[24px] pt-[8px] pb-[2px] box-content focus:border-purple-500 outline-none border-b border-b-[grey] border-solid"
					/>
				</div>
				<label className="text-[12px]">Date of operation (required)</label>
			</div>
			<div className="flex flex-col">
				<input
					ref={operationName}
					onChange={validateOperationName}
					placeholder="Operation name"
					required="required"
					className="w-[262px] h-[24px] outline-none border-b border-solid border-[grey] pt-[8px] pb-[2px] box-content placeholder:text-purple-300 focus:border-purple-500 focus:placeholder:text-red-500 focus:placeholder:font-bold"
				/>
				<label className="text-[12px]">Operation name (required)</label>
			</div>
			<div className="flex flex-col">
				<input
					ref={transactionAmount}
					onChange={validateTransactionAmount}
					placeholder="Transaction amount"
					required="required"
					className="w-[262px] h-[24px] outline-none border-b border-solid border-[grey] pt-[8px] pb-[2px] box-content placeholder:text-purple-300 focus:border-purple-500 focus:placeholder:text-red-500 focus:placeholder:font-bold"
				/>
				<label className="text-[12px]">Transaction amount (required)</label>
			</div>

			<div className="flex flex-col">
				<input
					ref={comment}
					onChange={validateComment}
					placeholder="Transaction comment"
					className="w-[262px] h-[24px] outline-none border-b border-solid border-[grey] pt-[8px] pb-[2px] box-content placeholder:text-purple-300 focus:border-purple-500 focus:placeholder:text-red-500 focus:placeholder:font-bold"
				/>
				<label className="text-[12px]">Comment on the operation (not required)</label>
			</div>

			<div className="flex justify-between w-full pt-[1rem]">
				<Link
					to={'/#'}
					className="w-[45%] h-[2.4rem] rounded-[0.8rem] bg-tomato py-[0.2rem] px-[0.5rem] text-[#ffffff] drop-shadow-sm hover:bg-red-700 hover:opacity-100 transition-all duration-[0.4s] active:scale-[0.97] flex items-center justify-center"
				>
					Back
				</Link>
				<button
					className="w-[45%] h-[2.4rem] rounded-[0.8rem] bg-purple-800 py-[0.2rem] px-[0.5rem] text-[#ffffff] drop-shadow-sm hover:bg-purple-600 hover:opacity-100 transition-all duration-[0.4s] active:scale-[0.97] flex items-center justify-center"
					onClick={handleSubmit}
				>
					Save
				</button>
			</div>
		</form>
	)
}

export default NewOperation
