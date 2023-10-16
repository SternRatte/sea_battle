import React from 'react';
import  "../css/playingField.css";

const PlayingField = () => {

    let matrix = Array(10)
    for (let i = 0; i < 10; i++) {
        matrix[i] = new Array(10).fill(i)
    }

    let alph = ["А","Б","В","Г","Д","Е","Ж","З","И","К"];

    return(
        <div className='field'>
            <div className="marker-column">
                {
                    alph.map(letter => <div className="column">{letter}</div>)
                }
            </div>

                {matrix.map((row, indexRow = 1) => {
                    return (
                        <div key={indexRow} className ="row">
                            <div className="marker-row">{indexRow + 1}</div>
                            {
                                row.map((item, indexColumn = 1) => {
                                return (
                                    <div
                                        key={indexRow + " " + indexColumn}
                                        name={matrix[indexRow][indexColumn]}
                                        data-x = {indexColumn}
                                        data-y = {indexRow}
                                        className="cell"

                                    />
                                )})
                            }
                        </div>
                    )
                })}
        </div>
    )
};

export default PlayingField;