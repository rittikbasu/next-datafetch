import Table from "../components/Table.js";

export default function Home({ data }) {
  return <Table data={data} />;
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://random-data-api.com/api/users/random_user?size=100"
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
};
