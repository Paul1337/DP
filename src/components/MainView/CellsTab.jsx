import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DimentionType } from '../../redux/model/dimention.js';
import Cell from '../Cell/Cell.jsx';
import { updateFieldItemAction } from '../../redux/reducers/rootReducer.js';
import constrains from '../../redux/model/constrains.js';
import CellsField from '../CellField/CellField.jsx';

const CellsTab = () => {
    const dispatch = useDispatch();
    const field = useSelector((state) => state.field);
    const controls = useSelector((state) => state.controls);

    return (
        <CellsField
            field={field}
            dimention={controls.dimention}
            onItemChange={(pos, e) =>
                dispatch(
                    updateFieldItemAction({
                        ...pos,
                        value: Number(e.target.value),
                    })
                )
            }
        />
    );
};

export default CellsTab;
