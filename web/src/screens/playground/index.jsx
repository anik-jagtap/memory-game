import React, { useState, useEffect } from "react";
import Timer from "react-compound-timer";
import Card from "../../widgets/card";
import "./style.scss";
import PlaygroundController from "./playground";
import utility from "../../utility";
import { useParams } from "react-router-dom";
const _pgController = new PlaygroundController();

const Playground = (props) => {

    const [ isFetching, setIsFetching ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    const params = useParams();

    console.log("params", params);

    useEffect(async() => {
        if (!params.id) {
            return;
        }
        await _pgController.fetchGame(params.id);
        const updateState = {
            isFetching: false
        };
        setIsFetching(false);
        if (_pgController.error) {
            // updateState.error = _pgController.error;
            setError(_pgController.error);
        }
    }, []);

    const onCardClick = async (CardNo) => {
        if (_pgController.game.lastCard == -1) {
            await _pgController.openCard(CardNo);
            setRefresh(!refresh);
        } else {
            _pgController.game.board[CardNo - 1].isFlipped = true;
            setRefresh(!refresh);
            // const self = this;
            setTimeout(async() => {
                await _pgController.openCard(CardNo);
                setRefresh(!refresh);
            }, 3000);
        }
    }

    const renderRow = (rowNumber, start, size) => {
        const row = [];
        let i = 0;
        while(i < size) {
            if (!_pgController.game.board[start + i].isMarked) {
                row.push(
                    <div className="card-element" key={`ce-${start + i}`}>
                        <Card cardID={start + i + 1} data={_pgController.game.board[start + i].key} isFlipped={_pgController.game.board[start + i].isFlipped} isMarked={_pgController.game.board[start + i].isMarked} onCardClick={(cardNo) => onCardClick(cardNo)} />
                    </div>
                )
            }
            ++i;
        }
        return <div className="row" key={`row-${rowNumber}`}>{row}</div>
    }

    const renderTable = () => {
        const level = _pgController.game.difficultyLevel.toLowerCase();
        const colSize = level == "easy" ? 5 : 10;
        const rowSize = level == "easy" ? 2 : level == "medium" ? 3 : 5;
        const tableData = [];
        let start = 0;
        for (let i = 0; i < rowSize; ++i) {
            start = i * colSize;
            tableData.push(renderRow(i, start, colSize));
        }
        return tableData;
    }
    
    if (isFetching) {
        return null;
    }
    if (error) {
        return <div className="card-table">
            {"Something went wrong, Please try again later"}
        </div>
    }
    if(_pgController && _pgController.game) {
        return (
            <div className="card-table">
                {/* <p>Hello this is my game Playground.</p> */}
                <div className="score-timer">
                    <div className="timer"> Elapsed Time
                        {
                            (_pgController.game.startedAt > -1 && !_pgController.game.finishedAt) ?
                            <Timer initialTime={Date.now() - (_pgController.game.startedAt || 0)}>
                                {({ start, resume, pause, stop, reset, timerState }) => (
                                    <React.Fragment>
                                        <div>
                                            <Timer.Hours />H : <Timer.Minutes />M : <Timer.Seconds />S
                                        </div>
                                    </React.Fragment>
                                )}
                            </Timer> : <><br/>{"0H : 0M : 0S"}</>
                        }
                    </div>
                    {
                        _pgController.game.ratings && <div className="ratings">
                            Ratings: {_pgController.game.ratings} / 3<br/>
                            Elapsed Time: {utility.convertToHumanReadable(_pgController.game.finishedAt, _pgController.game.startedAt)}, Error Score: {_pgController.game.errorScore || 0}
                        </div>
                    }
                    {
                        _pgController.game.errorScore > -1 && <div className="score">
                            {`Error Score: ${_pgController.game.errorScore}`}
                        </div>
                    }
                </div>
                { error && <p>{error}</p> }
                {
                    renderTable()
                }
            </div>
        )
    }
}

export default Playground;