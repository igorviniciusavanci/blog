import React from 'react';

import styles from './style.module.css';

export default function NavBar() {
  return (
    <header className={styles.header}>
      <p className={styles.logo}>NEWS Blog</p>
    </header>
  );
}
