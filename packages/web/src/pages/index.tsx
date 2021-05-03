import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import api from '../services/api';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { data } = await api.post('boxes', { title });
      router.push(`/box/${data._id}`);
    },
    [title]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>RocketBox - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit}>
        <img src="/logo.svg" alt="RocketBox Logo" />
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Box Name"
          value={title}
        />
        <button type="submit">Create New Box</button>
      </form>
    </div>
  );
};

export default HomePage;
