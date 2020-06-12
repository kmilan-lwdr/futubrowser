import React, { Component} from 'react';

class InfoOverlay extends Component {
    render() {
        
        return (
            <div className="overlay">
                <div className="text">
                    {this.props.text}
                    <div className={this.props.iconClass}/>
                </div>                              
            </div>
        );

  }
}

export default InfoOverlay;