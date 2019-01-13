import React from 'react';
import styles from './Button.module.css';

const button = (props) => <button className={styles.error} onClick={props.click}>{props.children}</button>;

export default button;