const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  env: {
    API_HOST: process.env.API_HOST,
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/courses',
        permanent: false,
      },
    ];
  },
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_HOST}/:path*`,
      },
    ];
  },
});
