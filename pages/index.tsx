import { GetServerSidePropsContext } from 'next';

export default function HomePage() {
  return null;
}

HomePage.getInitialProps = ({ res }: GetServerSidePropsContext) => {
  if (res) {
    res.writeHead(301, {
      Location: '/auth/sign-in',
    });
    res.end();
  }
  return null;
};
