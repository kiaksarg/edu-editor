const withImages = require('next-images')

module.exports = withImages({
    swcMinify: true,
    env: {
        NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    },
})
