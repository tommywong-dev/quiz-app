import { GetServerSidePropsResult } from "next";

export const redirectHome = <P>(): GetServerSidePropsResult<P> => {
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};

export const redirectQuiz = <P>(id: number): GetServerSidePropsResult<P> => {
  return {
    redirect: {
      permanent: false,
      destination: `/quiz/${id}`,
    },
  };
};
