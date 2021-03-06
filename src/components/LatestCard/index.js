import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './style.module.css';

export default function LatestCard({ publications }) {
  function formatDate(timetamp) {
    return moment(timetamp).format('MMM DD, YYYY');
  }
  return (
    <div className={styles.container}>
      <h2>Latest:</h2>
      <ul>
        {publications.map((publication) => {
          const { title, metadata } = publication;
          return (
            <li key={title}>
              <div className={styles.latest}>
                <div className={styles.icon}>
                  <p>A</p>
                </div>
                <div className={styles.content}>
                  <a href={`#${title}`}>{title}</a>
                  <p>{formatDate(metadata.publishedAt)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

LatestCard.propTypes = {
  publications: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      metadata: PropTypes.shape({
        publishedAt: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};
