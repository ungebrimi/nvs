/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6eWpmeWV3YWdmem9jd3FtcGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ3MDQwNzgsImV4cCI6MTk4MDI4MDA3OH0.4m8qPt31I0bom0NERZWtnvuGQzjnWabrRXkCXtl0JGM",
    MAPBOX_ACCESS_TOKEN: "pk.eyJ1IjoidmlydHVhbGVzdGF0ZSIsImEiOiJja3JxOGV5aTQxbnZmMnBub3d5MjRkcWtwIn0.wsiGxsh4YBe2wBynfZpH2A",
    MATTERPORT_KEY: "g1r3bxhbbcw8y696rncu3kkwb",
    HCAPTCHA_TOKEN: "7ff927a1-2a32-4838-801b-768673257dda",
    MATTERPORT_SDK: "g1r3bxhbbcw8y696rncu3kkwb",
  },
  images: {
    domains: ["wzyjfyewagfzocwqmpbp.supabase.co"],
  },
}

module.exports = nextConfig
