import { Input, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MainView.module.css';

const CalculationsTab = () => {
    const controls = useSelector((state) => state.controls);
    const field = useSelector((state) => state.field);

    const argsCnt = controls.fieldSize.length;
    const [args, setArgs] = useState(new Array(argsCnt).fill(0));

    useEffect(() => {
        setArgs(new Array(argsCnt).fill(0));
    }, [argsCnt]);

    const handleArgsChange = (e, ind) => {
        setArgs((prev) => prev.map((arg, ind_) => (ind_ === ind ? Number(e.target.value) : arg)));
    };

    const getResult = () => {
        if (args.length == 1) return field[args[0]];
        if (args.length == 2) return field[args[0]]?.[args[1]];
    };

    return (
        <div className={styles.calculationsCont}>
            <p className={styles.calculationsText.concat(' ', styles.functionText)}>
                {controls.name || 'function'}(
            </p>
            {args.map((arg, ind) => (
                <TextField
                    key={ind}
                    type='number'
                    size='small'
                    value={arg?.toString()}
                    onChange={(e) => handleArgsChange(e, ind)}
                />
            ))}

            <p className={styles.calculationsText}>) = </p>
            <p className={styles.calculationsText.concat(' ', styles.calculationsResult)}>
                {getResult()}
            </p>
        </div>
    );
};

export default CalculationsTab;
