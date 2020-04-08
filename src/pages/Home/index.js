import React, { useEffect, useState } from 'react';

import api, { errorHandle } from '../../service';
import './style.css';

export default function Home() {
  const [publications, setPublications] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [responsePublications, responseAuthors] = await Promise.all([
          api.get('/5be5e3fa2f000082000fc3f8'),
          api.get('/5be5e3fa2f000082000fc3f8'),
        ]);
        console.log(responseAuthors.data);
        console.log(responsePublications.data);
        setAuthors(responseAuthors.data);
        setPublications(responsePublications.data);
      } catch (error) {
        console.log(error);
        errorHandle(error);
      }
    }

    fetchData();
  }, []);

  return (
    <ul>
      {publications.map((publication) => {
        return <li key={publication.title}>{publication.title}</li>;
      })}
    </ul>
  );
}
