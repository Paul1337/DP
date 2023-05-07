import React, { useState } from 'react';
import styles from './Controls.module.css';
import { FormControl, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DimentionType } from '../../redux/model/dimention.js';
import {
    updateCodeAction,
    updateDimentionAction,
    updateFieldSizeAction,
    updateNameAction,
} from '../../redux/reducers/rootReducer.js';
import constrains from '../../redux/model/constrains.js';
import { loadCodeThunkAction } from '../../redux/thunks/codeHandling.js';

const isDimentionValid = (dimValue) => {
    dimValue = Number(dimValue);
    return dimValue >= 0 && dimValue <= constrains.MAX_DIMENTION;
};

const AlgoMode = {
    New: 'new',
    Saved: 'saved',
};

const Controls = () => {
    const dispatch = useDispatch();
    const controls = useSelector((state) => state.controls);
    const savedAlgos = useSelector((state) => state.savedAlgos);

    const [algoMode, setAlgoMode] = useState(AlgoMode.New);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        dispatch(updateNameAction(newName));

        if (algoMode == AlgoMode.Saved) {
            dispatch(loadCodeThunkAction(newName));
        }
    };

    const handleAlgoModeChange = (e) => {
        const newMode = e.target.value;
        setAlgoMode(newMode);
        if (newMode == AlgoMode.Saved) {
            dispatch(updateNameAction(savedAlgos[0]));
            dispatch(loadCodeThunkAction(savedAlgos[0]));
        } else if (newMode == AlgoMode.New) {
            dispatch(updateNameAction(''));
            dispatch(updateCodeAction(''));
        }
    };

    return (
        <div className={styles.cont}>
            <div className={styles.controlsBlock}>
                <FormControl>
                    <InputLabel id='dimention-select-label'>Размерность</InputLabel>
                    <Select
                        labelId='dimention-select-label'
                        label='Размерность'
                        value={controls.dimention}
                        onChange={(e) => dispatch(updateDimentionAction(e.target.value))}
                    >
                        {Object.values(DimentionType).map((dimType) => (
                            <MenuItem key={dimType.value} value={dimType.value}>
                                {dimType.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {new Array(controls.dimention).fill(0).map((val, ind) => (
                    <TextField
                        key={ind}
                        label={`кол-во ${ind + 1}`}
                        type='number'
                        value={controls.fieldSize[ind].toString()}
                        onChange={(e) =>
                            isDimentionValid(e.target.value) &&
                            dispatch(
                                updateFieldSizeAction({
                                    dimention: ind,
                                    value: Number(e.target.value),
                                })
                            )
                        }
                    />
                ))}
            </div>

            <div className={styles.nameBlock}>
                <TextField
                    label='Название'
                    value={controls.name}
                    onChange={handleNameChange}
                    select={algoMode == AlgoMode.Saved}
                >
                    {algoMode == AlgoMode.Saved &&
                        savedAlgos.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                </TextField>

                <Select value={algoMode} onChange={handleAlgoModeChange}>
                    <MenuItem value={AlgoMode.New}>Новый алгоритм</MenuItem>
                    <MenuItem disabled={savedAlgos.length == 0} value={AlgoMode.Saved}>
                        существующий алгоритм
                    </MenuItem>
                </Select>
            </div>
        </div>
    );
};

export default Controls;
