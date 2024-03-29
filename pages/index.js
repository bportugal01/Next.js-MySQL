import Head from 'next/head'
import Layout from '@/component/Layout'
import { useState } from 'react';
import AppContext from '@/context/appContext';



export default function Home({ users }) {

  const [myUsers, setMyUsers] = useState(users);
  return (
    <>
      <Head>
        <title>NextJS MySQL CRUD tutorial</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="Description" content="NextJS MySQL CRUD tutorial" />
        <meta name="author" content="anand346@BePractical" />
        <meta name="og:url" content="https://www.linkedin.com/in/anand346" />
      </Head>
      <main >
        <AppContext.Provider value={{
          users: myUsers,
          setMyUsers: setMyUsers
        }}>

          <Layout />
          
        </AppContext.Provider>
      </main>
    </>
  )
}


export async function getServerSideProps() {

  const reponse = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users`);
  const users = await reponse.json();

  return {
    props: {
      users: users
    }
  }
}