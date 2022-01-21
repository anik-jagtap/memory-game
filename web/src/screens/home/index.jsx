import React from "react";
import "./style.scss";
import HomeController from "./home";
import { useNavigate } from "react-router-dom";
const _homeController = new HomeController();

const Home = (props) => {
    let navigate = useNavigate();
    const handleClickListener = async (level) => {
        const response = await _homeController.initiateGame(level);
        if (!response.success) {
            alert("Something went wrong. Please try again later.");
            return;
        }
        // let navigate = useNavigate();
        // navigate to playground
        // const { history } = this.props;
        navigate(`/playground/${response.data.gameID}`);
    }
    return (
        <div className="container">
            <h1>Memory Game</h1>
            <h2>Please select game difficulty</h2>
            {/* <Card /> */}
            <div className={"level-box"}>
                <div className="button-wrapper">
                    <div className={"level-button"} onClick={() => handleClickListener("easy")}>{"Easy"}</div>
                </div>
                <div className="button-wrapper">
                    <div className={"level-button"} onClick={() => handleClickListener("medium")}>{"Medium"}</div>
                </div>
                <div className="button-wrapper">
                    <div className={"level-button"} onClick={() => handleClickListener("hard")}>{"Hard"}</div>
                </div>
                {/* <div className={"level-button"} onClick={() => this.handleClickListener("easy")}>{"Easy"}</div>
                <div className={"level-button"} onClick={() => this.handleClickListener("medium")}>{"Medium"}</div>
                <div className={"level-button"} onClick={() => this.handleClickListener("hard")}>{"Hard"}</div> */}
            </div>
        </div>
    )
}

export default Home;