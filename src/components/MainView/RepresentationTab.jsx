import styles from './RepresentationTab.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CellsField from '../CellField/CellField.jsx';

const RepresentationTab = () => {
    const dispatch = useDispatch();
    const presentation = useSelector((state) => state.presentation);

    console.log(presentation.data);

    return (
        <div>
            <CellsField field={presentation.data} dimention={presentation.dimention} />
        </div>
    );
};

export default RepresentationTab;
