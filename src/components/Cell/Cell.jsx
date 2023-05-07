import { Input } from '@mui/material';
import React from 'react';
import styles from './Cell.module.css';

const Cell = ({ value, onChange, position }) => {
    const style = {
        gridColumnStart: position.j + 1,
        gridRowStart: position.i + 1,
    };
    return (
        <div className={styles.cell} style={style}>
            <Input type='number' size='small' value={value.toString()} onChange={onChange} />
        </div>
    );
};

export default Cell;
