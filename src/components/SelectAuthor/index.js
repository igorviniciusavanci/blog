import React, { useState } from 'react';

import styles from './style.module.css';

function AuthorItem({ name, selected, onchange }) {
  return (
    <li>
      <div className={styles.authorItem}>
        <button
          type="button"
          className={selected ? styles.cancelButton : styles.cancelButtonHide}
          onClick={() => onchange(selected)}
        >
          <span className={styles.cancelIcon} />
        </button>
        <button
          type="button"
          className={
            selected ? styles.authorButtonSelected : styles.authorButton
          }
          onClick={() => selected || onchange(selected)}
        >
          {name}
        </button>
      </div>
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
      <h2>Our authors:</h2>
      <ul className={styles.authorsContainer}>
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
