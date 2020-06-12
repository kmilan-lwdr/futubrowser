import React, { Component} from 'react';

class FailureOverlay extends Component {
    render() {
        
        return (
            <div className="overlay">
                <div className="text">
                    Unable to fetch data
                    <div className="failureIcon"/>
                </div>         
            </div>
        );
  }
}


export default FailureOverlay;