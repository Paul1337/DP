import { TextField } from '@mui/material';
import React from 'react';
import styles from './DataTab.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateExtraDataItemAction,
    updateExtraDataSizeAction,
    parseCodeAction,
} from '../../redux/reducers/rootReducer.js';
import constrains from '../../redux/model/constrains.js';
import CellsField from '../CellField/CellField.jsx';

const isValidDimention = (val) => Number(val) >= 0 && Number(val) <= constrains.MAX_DIMENTION;

const DataTab = () => {
    const dispatch = useDispatch();
    const extraData = useSelector((state) => state.extraData);

    return (
        <div>
            <div className={styles.dataControls}>
                {extraData.size.map((dim, ind) => (
                    <TextField
                        style={{
                            margin: '5px',
                        }}
                        key={ind}
                        type='number'
                        size='small'
                        value={dim.toString()}
                        onChange={(e) =>
                            isValidDimention(e.target.value) &&
                            dispatch(
                                updateExtraDataSizeAction({
                                    dimention: ind,
                                    value: Number(e.target.value),
                                })
                            )
                        }
                    />
                ))}
            </div>
            <CellsField
                field={extraData.data}
                dimention={extraData.dimention}
                onItemChange={(pos, e) => {
                    dispatch(
                        updateExtraDataItemAction({
                            ...pos,
                            value: Number(e.target.value),
                        })
                    );
                    dispatch(parseCodeAction());
                }}
            />
        </div>
    );
};

export default DataTab;
