import { GetServerSideProps } from 'next';
// import { useState } from 'react';
import { buildUrl } from '../../shared/utils/build-url';
// import { Slide } from '../../shared/types/block.interface';
import styles from './knowledge-check.module.scss';

// type KnowledgeCheckProps = {
//   questions: Array<Slide>;
// };
//
// enum Stages {
//   notStarted,
//   chosen,
//   answered,
//   complete,
// }

export default function KnowledgeCheck() {
  return (
    <div className={styles.page}>a</div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  if (!params?.id) {
    return { notFound: true };
  }
  const response = await fetch(buildUrl(`/course/knowledge-check/${params.id}`), {
    headers: {
      cookie: req.headers.cookie as string,
    },
  });
  const { body: questions, message } = await response.json();
  if (message === 'Unauthorized') {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: `/auth/sign-in?returnUrl=${req.url}`,
      },
    };
  }
  return {
    props: {
      questions: questions.map(
        (question: any) => ({ ...question, content: JSON.parse(question.content) }),
      ) || [],
    },
  };
};
