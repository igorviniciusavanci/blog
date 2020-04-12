import React, { useEffect, useState } from 'react';

import api, { errorHandle } from '../../service';

import Card from '../../components/Card';
import LatestCard from '../../components/LatestCard';
import SelectAuthor from '../../components/SelectAuthor';
import Dropdown from '../../components/Dropdown';

import styles from './style.module.css';

export default function Home() {
  const [publications, setPublications] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [responsePublications, responseAuthors] = await Promise.all([
          api.get('/5be5e3fa2f000082000fc3f8'),
          api.get('/5be5e3ae2f00005b000fc3f6'),
        ]);
        setAuthors(responseAuthors.data);
        setFilteredPublications(responsePublications.data);
        setPublications(responsePublications.data);
      } catch (error) {
        errorHandle(error);
      }
    }
    fetchData();
  }, []);

  function filterPublications(authorsSelected) {
    if (authorsSelected.length === 0) {
      setFilteredPublications(publications);
    } else {
      const filtered = publications.filter((publication) => {
        return authorsSelected.includes(publication.metadata.authorId);
      });
      setFilteredPublications(filtered);
    }
  }

  function orderByDate(sortType) {
    const copyArray = filteredPublications.slice();
    copyArray.sort((a, b) => {
      const isReversed = sortType === 'asc' ? 1 : -1;
      return (
        isReversed * a.metadata.publishedAt +
        isReversed * -1 * b.metadata.publishedAt
      );
    });
    setFilteredPublications(copyArray);
  }

  function getAuthorNameById(id) {
    const foundAuthor = authors.find((author) => author.id === id);
    return foundAuthor.name;
  }

  function handleDropdownChange(value) {
    orderByDate(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.authorContainer}>
        <SelectAuthor
          authors={authors}
          onSelect={(list) => filterPublications(list)}
        />
        <Dropdown onChange={handleDropdownChange} />
      </div>
      <div className={styles.latestContainer}>
        <LatestCard publications={publications} />
      </div>
      <div className={styles.postsContainer}>
        <ul className={styles.posts}>
          {filteredPublications.map((publication) => {
            const { title, body, metadata } = publication;
            return (
              <Card
                key={title}
                title={title}
                content={body}
                author={getAuthorNameById(metadata.authorId)}
                publicationDate={metadata.publishedAt}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
