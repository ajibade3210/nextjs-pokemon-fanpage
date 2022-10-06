import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../../styles/Details.module.css";
import { useRouter } from 'next/router'
import React from 'react'

export async function getStaticPaths() {
  //returns an obj that has a list of all the different path we are to generate
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
    const pokemon = await resp.json()
console.log(pokemon)
    return {
      paths: pokemon.map(pokemon => ({
        params: {id: pokemon.id.toString()}
      })),
      fallback: false
    }
}

export async function getStaticProps({params}) {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await res.json()
    },
    revalidate: 30
  }
}

const Details = ({pokemon}) => {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back To Home</a>
        </Link>
      </div>
      <h1>View Pokemon Attribute</h1>
      <div className={styles.layout}>
        <div>
          <Image
                  src={
                    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`
                  }
                  priority={true}
                  className="rounded-full"
                  width={250}
                  height={250}
                  alt={pokemon.name}
                />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {/* {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Details;