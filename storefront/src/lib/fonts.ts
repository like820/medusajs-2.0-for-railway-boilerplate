import { Source_Sans_3, Source_Serif_4, Source_Code_Pro } from 'next/font/google'

export const sourceSans3 = Source_Sans_3({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
})

export const sourceSerif4 = Source_Serif_4({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-serif',
})

export const sourceCodePro = Source_Code_Pro({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
})
