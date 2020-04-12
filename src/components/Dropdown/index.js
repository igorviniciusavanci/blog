import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Dropdown({ onChange }) {
  const [selected, setSelected] = useState('asc');

  function handleChange(event) {
    setSelected(event.target.value);
    onChange(event.target.value);
  }

  return (
    <select
      value={selected}
      className={styles.container}
      onChange={handleChange}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
}

Dropdown.defaultProps = {
  onChange: () => {},
};

Dropdown.propTypes = {
  onChange: PropTypes.func,
};
