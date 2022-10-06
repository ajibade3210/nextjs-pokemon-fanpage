// eslint-disable @next/next/no-img-element
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
console.log(resp)
  return {
    props: {
      pokemon: await resp.json()
    }
  }
}

export default function Home({pokemon}) {
  console.log(pokemon)
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
      <h1>Pokemon Fan Page</h1>
        {pokemon.map(pokemon => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
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
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
