import clsx from "clsx"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate, useLocation } from "react-router-dom"
import { prevRoute } from "../utils/pager"
import { usePageStore } from "../composable/usePageStore"

function Component() {
	const location = useLocation()
	const navigate = useNavigate()
	const { totalPages, percentage, answered, total } = usePageStore()

	const buttonClassesString =
		"bg-zinc-200 w-10 h-10 rounded-md m-1 p-2 select-none flex justify-center items-center"

	return (
		<>
			<footer
				className="w-full bg-white h-20 px-5 shadow-2xl shadow-black flex justify-center items-center bottom-0 fixed">
				<div className="flex justify-between max-w-full w-192 m-3">
					<div className="flex w-3/4 items-center">
						<div role="progressbar" aria-label="作答進度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage} aria-valuetext={`已回答 ${answered} 題，共 ${total} 題`} className="w-full bg-gray-200 h-5 rounded-md overflow-hidden relative">
							<div className="bg-cyan-500 h-full transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${percentage}%` }}></div>
						</div>
						<div className="mx-2 tabular-nums" title={`已回答 ${answered} / ${total} 題`}>{percentage}%</div>
					</div>
					<div className="flex">
						<button
							type="button"
							aria-label="上一頁"
							disabled={location.pathname === "/"}
							className={clsx(buttonClassesString, {
								"opacity-40": location.pathname === "/",
								"cursor-pointer": location.pathname !== "/",
								"cursor-not-allowed": location.pathname === `/`,
							})}
							onClick={() =>
								navigate(prevRoute(location.pathname, totalPages) ?? "")
							}>
							<MdKeyboardArrowLeft className="text-2xl text-cyan-500" />
						</button>
						<button
							aria-label="下一頁"
							type={location.pathname.startsWith("/page/") ? "submit" : "button"}
							form={location.pathname.startsWith("/page/") ? "survey-form" : undefined}
							disabled={location.pathname === `/end`}
							className={clsx(buttonClassesString, {
								"opacity-40": location.pathname === `/end`,
								"cursor-pointer": location.pathname !== "/end",
								"cursor-not-allowed": location.pathname === `/end`,
							})}
							onClick={() =>
								location.pathname === "/" ? navigate("/page/1") : undefined
							}>
							<MdKeyboardArrowRight className="text-2xl text-cyan-500" />
						</button>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Component
