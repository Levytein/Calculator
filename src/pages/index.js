import Head from 'next/head';
import Calculator from '../components/calc';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Calculator App</title>
        <meta name="description" content="A simple calculator app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <Calculator />
      </main>
    </div>
  );
}
