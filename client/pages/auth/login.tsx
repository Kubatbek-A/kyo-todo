import { GetServerSidePropsContext } from "next";
import Header from "@/components/Header/Header";
import Layout from "@/layouts/Layout";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;

  if (req.cookies.accessToken) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function Login() {
  return (
    <Layout>
      <Header />
    </Layout>
  );
}
