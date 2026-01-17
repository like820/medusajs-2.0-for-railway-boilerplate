"use client"

import { useRef, useEffect } from "react"
import { StoreRegion } from "@medusajs/types"
import { useMenu } from "@lib/context/menu-context"
import { clx } from "@medusajs/ui"
import SideMenu from "@modules/layout/components/side-menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Suspense, ReactNode } from "react"

export default function NavClient({ regions, cartButton }: { regions: StoreRegion[], cartButton: ReactNode }) {
    const navRef = useRef<HTMLElement>(null)
    const { isMenuOpen } = useMenu()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!navRef.current) return

            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window

            // Calculate mouse position relative to center of screen
            const x = (clientX - innerWidth / 2) / (innerWidth / 2)
            const y = (clientY - innerHeight / 2) / (innerHeight / 2)

            // Apply tilt: limited to 2 degrees (subtle, inverted)
            navRef.current.style.transform = `perspective(1000px) rotateY(${-x * 2}deg) rotateX(${-y * 2}deg)`
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div className="fixed top-0 inset-x-0 z-50 group perspective-1000">
            <header
                className={clx(
                    "relative h-16 mx-auto border-b transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-waterlike-blue",
                    isMenuOpen ? "bg-white/0 backdrop-blur-none border-waterlike-blue/0" : "bg-white/30 backdrop-blur-md"
                )}
            >
                <nav
                    ref={navRef}
                    className="content-container txt-xsmall-plus text-waterlike-blue flex items-center justify-between w-full h-full text-small-regular font-mono transition-transform ease-out will-change-transform"
                >
                    <div className="flex-1 basis-0 h-full flex items-center">
                        <div className="h-full">
                            <SideMenu regions={regions} />
                        </div>
                    </div>

                    <div className="flex items-center h-full">
                        <LocalizedClientLink
                            href="/"
                            className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase font-mono"
                            data-testid="nav-store-link"
                        >
                            <img
                                src="/profilePic.png"
                                alt="waterlike shop"
                                className="h-8 w-auto"
                            />
                        </LocalizedClientLink>
                    </div>

                    <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
                        <div className="hidden small:flex items-center gap-x-6 h-full">
                            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                                <LocalizedClientLink
                                    className="hover:text-ui-fg-base font-mono"
                                    href="/search"
                                    scroll={false}
                                    data-testid="nav-search-link"
                                >
                                    Search
                                </LocalizedClientLink>
                            )}
                            <LocalizedClientLink
                                className="hover:text-ui-fg-base font-mono"
                                href="/account"
                                data-testid="nav-account-link"
                            >
                                Account
                            </LocalizedClientLink>
                        </div>
                        <Suspense
                            fallback={
                                <LocalizedClientLink
                                    className="hover:text-ui-fg-base flex gap-2 font-mono"
                                    href="/cart"
                                    data-testid="nav-cart-link"
                                >
                                    Cart (0)
                                </LocalizedClientLink>
                            }
                        >
                            {cartButton}
                        </Suspense>
                    </div>
                </nav>
            </header>
        </div>
    )
}
