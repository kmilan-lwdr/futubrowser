import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';

class BackButton extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        
        return (
            <div className="button" onClick={this.props.history.goBack}>
                Back to gallery       
            </div>
        );
  }
}

export default withRouter(BackButton);