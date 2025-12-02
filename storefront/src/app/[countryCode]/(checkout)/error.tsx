"use client"

import { Heading, Text, Button } from "@medusajs/ui"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-y-4">
            <Heading level="h1">Something went wrong!</Heading>
            <Text className="text-ui-fg-subtle">
                {error.message || "An unexpected error occurred."}
            </Text>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    )
}
