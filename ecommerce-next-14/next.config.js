/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        remotePatterns:[
            {hostname:"images.unsplash.com"},
            // another hostname =>{hostname:"...."}
        ]
    },
    //active for use server form data
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
