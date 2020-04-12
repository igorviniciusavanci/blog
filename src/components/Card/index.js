import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './style.module.css';

export default function Card({ title, text, publicationDate, author }) {
  function formatDate(timetamp) {
    return moment(timetamp).format('MMM DD, YYYY');
  }

  return (
    <li data-testid="card" className={styles.item}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
          <p className={styles.author}>{author}</p>
          <p className={styles.date}>{formatDate(publicationDate)}</p>
        </div>
      </div>
    </li>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  publicationDate: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};
