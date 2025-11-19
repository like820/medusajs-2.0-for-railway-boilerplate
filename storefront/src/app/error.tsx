'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <h2 className="text-xl font-semibold">Something went wrong!</h2>
            <p className="text-gray-600">{error.message}</p>
            <button
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}
