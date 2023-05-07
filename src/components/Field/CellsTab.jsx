import React from 'react';
import styles from './Field.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DimentionType } from '../../redux/model/dimention.js';
import Cell from '../Cell/Cell.jsx';
import { updateFieldItemAction } from '../../redux/reducers/rootReducer.js';
import constrains from '../../redux/model/constrains.js';

const CellsTab = () => {
    const dispatch = useDispatch();
    const field = useSelector((state) => state.field);
    const controls = useSelector((state) => state.controls);

    return (
        <div className={styles.field}>
            {controls.dimention == DimentionType.one.value
                ? field.map((el, colInd) =>
                      colInd >= constrains.MAX_RENDERED_DIMENTION ? (
                          ''
                      ) : (
                          <Cell
                              key={colInd}
                              position={{ i: Math.floor(colInd / 10), j: colInd % 10 }}
                              value={el.toString()}
                              onChange={(e) =>
                                  dispatch(
                                      updateFieldItemAction({
                                          i: colInd,
                                          value: Number(e.target.value),
                                      })
                                  )
                              }
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
                                        onChange={(e) =>
                                            dispatch(
                                                updateFieldItemAction({
                                                    i: rowInd,
                                                    j: colInd,
                                                    value: Number(e.target.value),
                                                })
                                            )
                                        }
                                    />
                                )
                            )
                  )}
        </div>
    );
};

export default CellsTab;
