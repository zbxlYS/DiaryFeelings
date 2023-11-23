/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['i.pinimg.com', 'i.imgur.com'],
  },
  pageExtensions: ['js', 'jsx', 'tsx', 'ts'],

  // cz-shortcut-listen -> 이오류가 뜨는데 확장크롬을 모두 끄거나 밑에 설정값으로 경고 무시
  // 경고 무시 설정
  experimental: {
    reactRoot: true,
  },
}

module.exports = nextConfig
