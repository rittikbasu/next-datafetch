import Head from "next/head";
import Image from "next/image";
import Table from "../components/Table.js";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

export default function Home({ data }) {
  // map over the data and create a table row for each
  // const rows = data.map((item) => {
  //   console.log(item.first_name);
  // });
  return <Table data={data} />;
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://random-data-api.com/api/users/random_user?size=50"
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
};
