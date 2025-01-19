import localFont from 'next/font/local'

export const mediaSans = localFont({
    src: [
        {
            path: '../Fonts/mediaSan/mediasansextended-black-TRIAL-BF63c7546b0baeb.otf',
            weight: '700',
        }
    ],
    variable: '--font-media-sans'
})
export const Helevetica = localFont({
    src: [
        {
            path: '../Fonts/Helevtica/HelveticaNeueMedium.otf',
        }
    ],
    variable: '--font-helevetica'
})