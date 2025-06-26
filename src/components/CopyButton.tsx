import { Check, Copy, CopyCheck } from 'lucide-react'
import React, { useState } from 'react'

interface PropType {
    text: string,
    styles?: string
}

export default function CopyButton({ text, styles = 'ml-auto' }: PropType) {

    const [copied, setCopied] = useState<boolean>(false);

    const copyText = async () => {
        if (copied) return;
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
        await navigator.clipboard.writeText(text);
    }

    return (
        <button className={`${styles} mt-2 block cursor-pointer`} onClick={copyText}>
            {copied ? <CopyCheck className='w-5 h-5' /> : <Copy className='w-5 h-5' />}

        </button>
    )
}
