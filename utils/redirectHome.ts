import { GetServerSidePropsResult } from "next";

export const redirectHome = <P>(): GetServerSidePropsResult<P> => {
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
    props: {} as P,
  };
};
