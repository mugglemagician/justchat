
interface PropType {
    id: string,
    label: string,
    isFloating: boolean
}

export default function FloatingLabel({ id, isFloating, label }: PropType) {
    return (
        <label
            htmlFor={id}
            className={`absolute left-2 transition-all duration-300 bg-transparent font-semibold text-gray-500
                    ${isFloating
                    ? "top-[6px] text-xs"
                    : "top-1/2 -translate-y-1/2 text-md xs:text-lg"
                }`}
        >
            {label}
        </label>
    )
}
