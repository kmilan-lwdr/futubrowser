import React, { Component} from 'react';
import Image from 'react-graceful-image';
import PropTypes from 'prop-types';

class ThumbnailImage extends Component {
    constructor(props) {
        super(props);
        this.mouseOverEvent = this.mouseOverEvent.bind(this);
        this.state = {
            showTitleCard: false,
        };
    }

    mouseOverEvent() {
      this.setState({showTitleCard: !this.state.showTitleCard});
    }

    render() {
        
        return (
            <a href={"/view/"+this.props.id} onMouseEnter={this.mouseOverEvent} onMouseLeave={this.mouseOverEvent}>
                <Image className="thumbnail" 
                    src={this.props.url} 
                    width='150' height='150' 
                    alt={this.props.alt}
                    placeholderColor='#393d3a'/>
                
                    
                    <div className="titleCard" style={{display: this.state.showTitleCard ? 'block' : 'none'}}>
                        {this.props.title}
                    </div>
                                                   
            </a>
        );

  }
}

ThumbnailImage.propTypes = {
    //id: PropTypes.string,
    //alt: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    //key: PropTypes.string
};

export default ThumbnailImage;