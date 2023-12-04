import { Link } from 'react-router-dom'
import useDeleteKeyLocalStorage from '../hooks/useDeleteKeyLocalStorage'

const Options = () => {
	const deleteAllData = () => {
		useDeleteKeyLocalStorage('operations')
	}

	return (
		<div className="w-[262px] flex flex-col items-center mx-auto py-[1rem]">
			<p className="pt-[1rem] font-bold mb-[1rem]">Options:</p>
			<div className="w-[262px] flex flex-col items-start mx-auto py-[1rem]">
				<a
					className="font-extrabold text-red-500 text-[1rem] mb-[1rem] cursor-pointer hover:text-blue-500"
					onClick={deleteAllData}
				>
					Delete all saved data
				</a>
				<Link
					to={'/#'}
					className="w-[45%] h-[2.4rem] rounded-[0.8rem] bg-tomato py-[0.2rem] px-[0.5rem] text-[#ffffff] drop-shadow-sm hover:bg-red-700 hover:opacity-100 transition-all duration-[0.4s] active:scale-[0.97] flex items-center justify-center"
				>
					Back
				</Link>
			</div>
		</div>
	)
}

export default Options
