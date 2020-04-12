import React from 'react';
import PropTypes from 'prop-types';

import NavBar from '../components/NavBar';
import styles from './style.module.css';

export default function layout({ children }) {
  return (
    <>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </>
  );
}

layout.propTypes = {
  children: PropTypes.element.isRequired,
};
