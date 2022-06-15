import React from "react";
import Head from "next/head";

export default function Seo(props) {
  const { title, description } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Gaming- Tus juegos favoritos",
  description:
    "Tus juegos favoritos para PS4, XBOX, SWITCH, PC al mejor precio",
};
