"use client";

import React, { useRef, useLayoutEffect, TextareaHTMLAttributes } from 'react';

interface AutoResizeTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    minRows?: number;
    maxRows?: number;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
    value,
    onChange,
    onInput,
    placeholder = 'Ask Here',
    className = '',
    minRows = 1,
    maxRows,
    style,
    ...rest
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resize = () => {
        const ta = textareaRef.current;
        if (!ta) return;

        const cs = window.getComputedStyle(ta);

        // Parse line-height; if 'normal' or unparsable, approximate as font-size * 1.2
        let lineHeight = parseFloat(cs.lineHeight);
        if (isNaN(lineHeight)) {
            const fontSize = parseFloat(cs.fontSize) || 16;
            lineHeight = fontSize * 1.2;
        }

        // Parse vertical padding
        const paddingTop = parseFloat(cs.paddingTop) || 0;
        const paddingBottom = parseFloat(cs.paddingBottom) || 0;
        const verticalPadding = paddingTop + paddingBottom;

        // Reset height so scrollHeight is recalculated correctly
        ta.style.height = 'auto';

        // Determine scrollHeight (content height + padding)
        const scrollHeight = ta.scrollHeight;

        // Compute min and max heights in px
        const minHeight = lineHeight * minRows + verticalPadding;
        const maxHeight = maxRows ? lineHeight * maxRows + verticalPadding : Infinity;

        // Clamp the new height
        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        ta.style.height = `${newHeight}px`;

        // If content exceeds maxHeight, allow vertical scrollbar; else hide it
        if (scrollHeight > maxHeight) {
            ta.style.overflowY = 'auto';
        } else {
            ta.style.overflowY = 'hidden';
        }
    };

    // On mount and whenever value/minRows/maxRows change:
    useLayoutEffect(() => {
        resize();
    }, [value, minRows, maxRows]);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        // Resize first
        resize();
        // Forward events
        if (onInput) onInput(e);
        if (onChange) onChange(e as React.ChangeEvent<HTMLTextAreaElement>);
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onInput={handleInput}
            placeholder={placeholder}
            className={`w-full max-w-xl outline-none font-bold bg-white/10 backdrop-blur-md border-white/10 shadow-2xl shadow-black/10 rounded-md px-3 py-3 resize-none overflow-hidden ${className}`}
            rows={minRows}
            style={{ ...style, height: undefined }}
            {...rest}
        />
    );
};

export default AutoResizeTextarea;
