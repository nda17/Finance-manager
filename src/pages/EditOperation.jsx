import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

const EditOperation = () => {
	const [isValid, setIsValid] = useState('')
	const [informer, setInformer] = useState('Enter data:')
	const [operations, setOperations] = useLocalStorage([], 'operations')
	const [complete, setComplete] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	const { id, operationDate, operationName, transactionAmount, comment } = location.state

	const operationDateEdit = useRef(null)
	const operationNameEdit = useRef(null)
	const transactionAmountEdit = useRef(null)
	const commentEdit = useRef(null)

	const validateOperationDate = () => {
		if (operationDateEdit.current.value.length !== 0) {
			operationDateEdit.current.style.borderColor = '#44c47c'
			return true
		} else {
			operationDateEdit.current.style.borderColor = '#eb4034'
			return false
		}
	}

	const validateOperationName = () => {
		if (operationNameEdit.current.value.length !== 0) {
			operationNameEdit.current.style.borderColor = '#44c47c'
			return true
		} else {
			operationNameEdit.current.style.borderColor = '#eb4034'
			return false
		}
	}

	const validateTransactionAmount = () => {
		const regex = new RegExp('^[0-9-.]+$')
		if (regex.test(transactionAmountEdit.current.value)) {
			setIsValid(true)
			transactionAmountEdit.current.style.borderColor = '#44c47c'
			return true
		} else {
			setIsValid(false)
			transactionAmountEdit.current.style.borderColor = '#eb4034'
			return false
		}
	}

	const validateComment = () => {
		if (commentEdit.current.value.length !== 0) {
			commentEdit.current.style.borderColor = '#44c47c'
		} else {
			commentEdit.current.style.borderColor = 'grey'
		}
	}

	const saveEditOperation = currentEditOperation => {
		const otherOperations = operations.filter(item => item.id !== currentEditOperation.id)
		setOperations([currentEditOperation, ...otherOperations])
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

	const resetForm = () => {
		setInformer('Enter data:')
		operationDateEdit.current.value = ''
		operationDateEdit.current.style.borderColor = 'grey'
		operationNameEdit.current.value = ''
		operationNameEdit.current.style.borderColor = 'grey'
		transactionAmountEdit.current.value = ''
		transactionAmountEdit.current.style.borderColor = 'grey'
		commentEdit.current.value = ''
		commentEdit.current.style.borderColor = 'grey'
	}

	const redirect = () => {
		setComplete(true)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (validate()) {
			const data = {
				id: id,
				day: operationDateEdit.current.value.slice(8, 11),
				month: operationDateEdit.current.value.slice(5, 7),
				year: operationDateEdit.current.value.slice(0, 4),
				operationDate: operationDateEdit.current.value,
				operationName: operationNameEdit.current.value,
				transactionAmount: transactionAmountEdit.current.value,
				comment: commentEdit.current.value.length ? commentEdit.current.value : 'No comments'
			}
			saveEditOperation(data)
			resetForm()
			redirect()
		} else {
			setInformer('Correct mistakes!')
		}
	}

	useEffect(() => {
		validate()
	}, [])

	useEffect(() => {
		isValid ? setInformer('Enter data:') : setInformer('Correct mistakes!')
	}, [isValid])

	useEffect(() => {
		complete ? navigate('/#') : null
	}, [complete])

	return (
		<form className="w-[262px] flex flex-col items-center mx-auto py-[1rem]">
			<p className="pt-[1rem] font-bold mb-[1rem]">{informer}</p>
			<div className="flex flex-col">
				<input
					type="date"
					defaultValue={operationDate}
					ref={operationDateEdit}
					onChange={validateOperationDate}
					placeholder="Date of operation"
					required="required"
					className="cursor-pointer w-[262px] h-[24px] outline-none border-b border-solid border-[grey] pt-[8px] pb-[2px] box-content placeholder:text-purple-300 focus:border-purple-500 focus:placeholder:text-red-500 focus:placeholder:font-bold"
				/>
				<label className="text-[12px]">Date of operation (required)</label>
			</div>
			<div className="flex flex-col">
				<input
					defaultValue={operationName}
					ref={operationNameEdit}
					onChange={validateOperationName}
					placeholder="Operation name"
					required="required"
					className="w-[262px] h-[24px] outline-none border-b border-solid border-[grey] pt-[8px] pb-[2px] box-content placeholder:text-purple-300 focus:border-purple-500 focus:placeholder:text-red-500 focus:placeholder:font-bold"
				/>
				<label className="text-[12px]">Operation name (required)</label>
			</div>
			<div className="flex flex-col">
				<input
					defaultValue={transactionAmount}
					ref={transactionAmountEdit}
					onChange={validateTransactionAmount}
					placeholder="Transaction amount"
					required="required"
					className="w-[262px] h-[24px] outline-none border-b border-solid border-[grey] pt-[8px] pb-[2px] box-content placeholder:text-purple-300 focus:border-purple-500 focus:placeholder:text-red-500 focus:placeholder:font-bold"
				/>
				<label className="text-[12px]">Transaction amount (required)</label>
			</div>

			<div className="flex flex-col">
				<input
					defaultValue={comment}
					ref={commentEdit}
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
export default EditOperation
