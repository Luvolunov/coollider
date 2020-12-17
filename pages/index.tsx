import {GetServerSidePropsContext} from "next";

export default function HomePage() {
    return null;
}

HomePage.getInitialProps = function({ res }: GetServerSidePropsContext) {
    if (res) {
        res.writeHead(301, {
            Location: '/sign-in'
        });
        res.end();
    }

    return null;
}
