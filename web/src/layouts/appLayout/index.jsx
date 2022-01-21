import React from "react";
import "./style.scss"
class GameLayout extends React.Component {
    render() {
        return <div className="body-container">
                {/* <div className="body-inner"> */}
                {
                    this.props.children
                }
                {/* </div> */}
        </div>
    }
}
export default GameLayout;