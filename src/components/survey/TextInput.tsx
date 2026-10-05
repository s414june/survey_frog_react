import type { ComponentPropsWithRef } from "react"

export default function TextInput(props: ComponentPropsWithRef<"input">) {
	return <input {...props} className="w-full border border-cyan-500 rounded p-2 px-3 focus:outline-none focus:shadow-no-offset focus:shadow-cyan-500/50" />
}
