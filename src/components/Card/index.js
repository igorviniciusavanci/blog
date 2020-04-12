import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './style.module.css';

export default function Card({ title, content, publicationDate, author }) {
  function formatDate(timetamp) {
    return moment(timetamp).format('MMM DD, YYYY');
  }

  return (
    <li data-testid="card" className={styles.cardsItem}>
      <div className={styles.card}>
        <div className={styles.card_content}>
          <h1 className={styles.card_title}>{title}</h1>
          <p className={styles.card_text}>{content}</p>
          <p className={styles.author}>{author}</p>
          <p className={styles.date}>{formatDate(publicationDate)}</p>
          <button className={styles.btn}>Read More</button>
        </div>
      </div>
    </li>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publicationDate: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};
