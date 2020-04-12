import React, { useEffect, useState } from 'react';

import api, { errorHandle } from '../../service';

import Card from '../../components/Card';
import LatestCard from '../../components/LatestCard';
import SelectAuthor from '../../components/SelectAuthor';
import Dropdown from '../../components/Dropdown';

import styles from './style.module.css';

export default function Home() {
  const [fetchedPublications, setFetchedPublications] = useState([]);
  const [fetchedAuthors, setFetchedAuthors] = useState([]);
  const [publications, setPublications] = useState([]);
  const [latestPublications, setLatestPublications] = useState([]);
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    async function fetchData() {
      try {
        const [responsePublications, responseAuthors] = await Promise.all([
          api.get('/5be5e3fa2f000082000fc3f8'),
          api.get('/5be5e3ae2f00005b000fc3f6'),
        ]);
        setFetchedAuthors(responseAuthors.data);
        setFetchedPublications(responsePublications.data);
      } catch (error) {
        errorHandle(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(fetchedPublications);
    setPublications(orderByDate(fetchedPublications, order));
    setLatestPublications(getLatestPublications());
  }, [fetchedPublications]);

  function getLatestPublications() {
    const orderedPublications = orderByDate(fetchedPublications, 'desc');
    const firstTreePublications = orderedPublications.slice(0, 3);
    return firstTreePublications;
  }

  function filterPublicationsByAutrhor(authors) {
    if (authors.length === 0) {
      return orderByDate(fetchedPublications, order);
    }
    const filteredPublications = fetchedPublications.filter((publication) => {
      return authors.includes(publication.metadata.authorId);
    });
    return filteredPublications;
  }

  function orderByDate(list, sortType) {
    const copyArray = list.slice();
    copyArray.sort((a, b) => {
      const isReversed = sortType === 'asc' ? 1 : -1;
      return (
        isReversed * a.metadata.publishedAt +
        isReversed * -1 * b.metadata.publishedAt
      );
    });
    return copyArray;
  }

  function getAuthorNameById(id) {
    const foundAuthor = fetchedAuthors.find((author) => author.id === id);
    return foundAuthor.name;
  }

  function handleDropdownChange(value) {
    setOrder(value);
    const orderedPublications = orderByDate(publications, value);
    setPublications(orderedPublications);
  }

  function handleAuthorSelect(authors) {
    const filteredPublications = filterPublicationsByAutrhor(authors);
    setPublications(filteredPublications);
  }

  return (
    <div className={styles.container}>
      <div className={styles.authorContainer}>
        <SelectAuthor authors={fetchedAuthors} onSelect={handleAuthorSelect} />
        <Dropdown onChange={handleDropdownChange} />
      </div>
      <div className={styles.latestContainer}>
        <LatestCard publications={latestPublications} />
      </div>
      <div className={styles.postsContainer}>
        <ul className={styles.posts}>
          {publications.map((publication) => {
            const { title, body, metadata } = publication;
            return (
              <Card
                key={title}
                title={title}
                text={body}
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
