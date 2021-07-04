const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  env: {
    API_HOST: process.env.API_HOST,
  },
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_HOST}/:path*`,
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/courses',
        permanent: true,
      },
    ];
  },
});
