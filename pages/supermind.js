import SuperTable from "../components/SuperTable.js";

export default function Home({ data }) {
  return <SuperTable data={data} />;
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://supermind.rittikbasu.repl.co/team"
  );
  const raw_data = await res.json();
  const data = JSON.parse(raw_data);
  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
};
