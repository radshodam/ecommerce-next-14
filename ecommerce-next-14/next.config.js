/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        remotePatterns:[
            {hostname:"unsplash.com"},
            {hostname:"images.unsplash.com"},
            { hostname: "lh3.googleusercontent.com" },

            // another hostname =>{hostname:"...."}
        ]
    },
    //active for use server form data
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
