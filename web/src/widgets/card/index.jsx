import React from "react";
import ReactCardFlip from "react-card-flip";
import "./style.scss";
import CardBack from "../../images/card-back.jpg";
import CardFront from "../../images/card-front.jpg";
class Card extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            isFlipped: true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    async handleClick(e) {
        e.preventDefault();
        if (this.props.isFlipped) return;
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        const response = await this.props.onCardClick(this.props.cardID);
    }
     
    render() {
        return (
            <ReactCardFlip isFlipped={!this.props.isFlipped} flipDirection="vertical">
            <div className={this.props.isMarked ? "card-elem disable" : "card-elem"} onClick={this.handleClick}>
                <div className="closed-card">
                    <img className="closed-card" src={CardFront} />
                </div>
                <div className={"card-content"}>
                    { this.props.data }
                </div>
            </div>
        
            <div className={this.props.isMarked ? "card-elem disable" : "card-elem"} onClick={this.handleClick}>
                <img className="closed-card" src={CardBack} />
            </div>
            </ReactCardFlip>
        )
    }
}
export default Card;