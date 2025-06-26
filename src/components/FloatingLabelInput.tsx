import React, { useEffect, useRef, useState } from "react";
import FloatingLabel from "./FloatingLabel";


interface PropType {
    type: string,
    maxLength?: number,
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    id: string,
    backgroundColor?: string,
    styles?: string,
    textColor?: string,
    otherInputAttributes?: any
}

function FloatingLabelInput(
    {
        type,
        maxLength,
        value,
        handleChange,
        label,
        id,
        backgroundColor,
        styles = 'w-full',
        textColor = 'text-white',
        otherInputAttributes

    }: PropType) {

    const [isFloating, setIsFloating] = useState(value.length > 0);
    const isMount = useRef<boolean>(true);

    useEffect(() => {
        return () => {
            isMount.current = true;
        }
    }, []);

    useEffect(() => {
        if (!isMount.current) {
            if (value.length > 0) setIsFloating(true);
            else setIsFloating(false);
        }
        if (isMount.current)
            isMount.current = false;
    }, [value]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    }

    return (
        <div className={`${styles} ${textColor} relative`}>

            <input
                maxLength={maxLength}
                style={{ backgroundColor: backgroundColor || 'transparent' }}
                type={type}
                id={id}
                value={value}
                onChange={(e) => onInputChange(e)}
                onFocus={() => setIsFloating(true)}
                onBlur={() => setIsFloating(value !== "")}
                className={`w-full px-2 ${type === "password" && 'pr-11'} ${isFloating ? 'pt-[20px] pb-[2px]' : 'py-[11px]'} rounded-md ring-2
                ring-white focus:ring-cyan-500 outline-none text-lg transition-all duration-300 text-inherit`}
                {...otherInputAttributes} />

            <FloatingLabel
                id={id}
                isFloating={isFloating || value !== ''}
                label={label} />


        </div>
    );
}

export default React.memo(FloatingLabelInput);
// This component is a floating label input field.
// It takes in various props such as type, value, handleChange, label, id, and optional styles and attributes.
// The input field has a floating label that moves up when the input is focused or has a value.
// It also has a password visibility toggle for password inputs.
// The component uses state to manage the floating label, visibility of the password, and validation.
// The input field can also have a custom background color and text color.
// The component is memoized to prevent unnecessary re-renders.