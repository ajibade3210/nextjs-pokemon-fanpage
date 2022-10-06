import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../../styles/Details.module.css";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Details = () => {
    const {
        query: {id}
    } = useRouter();

    const [pokemon, setPokemon] = useState(null)

    useEffect(()=> {
        async function getPokemon(){
            const res = await fetch(
              `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
            );
            console.log(res);
            setPokemon(await res.json());
        }
        if(id){
            getPokemon();
        }
    },[id])

    if(!pokemon){
        return null;
    }
console.log(pokemon);
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
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