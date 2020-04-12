import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css';

function AuthorItem({ name, selected, onChange }) {
  return (
    <li>
      <div className={styles.authorItem}>
        <button
          type="button"
          className={selected ? styles.cancelButton : styles.cancelButtonHide}
          onClick={() => onChange(selected)}
        >
          <span className={styles.cancelIcon} />
        </button>
        <button
          type="button"
          className={
            selected ? styles.authorButtonSelected : styles.authorButton
          }
          onClick={() => selected || onChange(selected)}
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
              onChange={(value) =>
                value ? removeAuthor(author.id) : addAuthor(author.id)
              }
            />
          );
        })}
      </ul>
    </div>
  );
}
AuthorItem.defaultProps = {
  selected: false,
  onChange: () => {},
};

AuthorItem.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
};

SelectAuthor.defaultProps = {
  onSelect: () => {},
};

SelectAuthor.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onSelect: PropTypes.func,
};
