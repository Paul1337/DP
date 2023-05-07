import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DimentionType } from '../../redux/model/dimention.js';
import Cell from '../Cell/Cell.jsx';
import { updateFieldItemAction } from '../../redux/reducers/rootReducer.js';
import constrains from '../../redux/model/constrains.js';
import styles from './CellField.module.css';

const CellsField = ({ dimention, field, onItemChange }) => {
    return (
        <div className={styles.field}>
            {dimention == DimentionType.one.value
                ? field.map((el, colInd) =>
                      colInd >= constrains.MAX_RENDERED_DIMENTION ? (
                          ''
                      ) : (
                          <Cell
                              key={colInd}
                              position={{ i: Math.floor(colInd / 10), j: colInd % 10 }}
                              value={el.toString()}
                              onChange={(e) => onItemChange({ i: colInd }, e)}
                          />
                      )
                  )
                : field.map((row, rowInd) =>
                      rowInd >= constrains.MAX_RENDERED_DIMENTION
                          ? ''
                          : row.map((el, colInd) =>
                                colInd >= constrains.MAX_RENDERED_DIMENTION ? (
                                    ''
                                ) : (
                                    <Cell
                                        key={rowInd * row.length + colInd}
                                        position={{ i: rowInd, j: colInd }}
                                        value={el.toString()}
                                        onChange={(e) => onItemChange({ i: rowInd, j: colInd }, e)}
                                    />
                                )
                            )
                  )}
        </div>
    );
};

export default CellsField;
