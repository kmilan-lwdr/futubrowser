import React, { Component} from 'react';

class LoadingOverlay extends Component {
    render() {
        
        return (
            <div className="overlay">
                <div className="text">
                    Please wait...
                    <div className="loadingSpinner"/>
                </div>                              
            </div>
        );

  }
}


export default LoadingOverlay;