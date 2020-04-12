import React, { useState } from 'react';

import styles from './style.module.css';

function AuthorItem({ name, selected, onchange }) {
  return (
    <li
      className={selected ? styles.authorItemSelected : styles.authorItem}
      onClick={() => selected || onchange(selected)}
    >
      <div
        className={selected ? styles.cancelIconContainer : styles.iconHide}
        onClick={() => onchange(selected)}
      >
        <span className={styles.removeIcon} />
      </div>
      <p className={styles.authorName}>{name}</p>
    </li>
  );
}

export default function SelectAuthor({ authors, onSelect }) {
  const [authorsSelected, setAuthorsSelected] = useState([]);

  function addAuthor(id) {
    setAuthorsSelected([...authorsSelected, id]);
    onSelect([...authorsSelected, id]);
  }

  function removeAuthor(id) {
    const selected = authorsSelected.filter((element) => {
      return element !== id;
    });
    setAuthorsSelected(selected);
    onSelect(selected);
  }

  return (
    <div className={styles.container}>
      <h1>Our authors:</h1>
      <ul className={styles.authosContainer}>
        {authors.map((author) => {
          const selected = authorsSelected.includes(author.id);
          return (
            <AuthorItem
              key={author.id}
              selected={selected}
              name={author.name}
              onchange={(value) =>
                value ? removeAuthor(author.id) : addAuthor(author.id)
              }
            />
          );
        })}
      </ul>
    </div>
  );
}
