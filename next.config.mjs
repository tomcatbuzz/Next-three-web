/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: '6LeNmCQqAAAAANCH3o7witl1TPcrwcVXcNKaWhoB',
    NEXT_PUBLIC_ANALYTICS_ID: 'G-YVHKYD2P2Y'
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader']
    });
    return config
  },
  output: 'export',
  images: {
    unoptimized: true
  },
};

export default nextConfig;
