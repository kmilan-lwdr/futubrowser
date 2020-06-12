import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingOverlay from './LoadingOverlay'
import FailureOverlay from './FailureOverlay'
import Image from 'react-graceful-image';

export default function ViewerContainer(props) {
    const state = {
        loading: true
    }

    const data = {
        image: undefined
    }

    const [image, setImage] = useState(data)
    const [loading, setLoadingState] = useState(state);

    useEffect(() => {

        const getImageData = async () => {  
            await axios
            .get(`http://jsonplaceholder.typicode.com/photos/${props.match.params.id}`)
            .then(response => {
                console.log(response.data);
                setImage(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoadingState(false);              
            });

        }

        getImageData();
    }, [props.match.params.id]) 

    // Return a table with some data from the API.
    return (
        <div className="container">
            {
                loading ? (
                    <LoadingOverlay/>
                ) : (
                    image.id ?  (
                    <div className="row">
                        <div className="column">
                            <Image className="imageView" 
                                src={image.url} 
                                width='600' height='600' 
                                alt={image.id}
                                placeholderColor='#393d3a'/>    
                            
                        </div>
                        <div className="column description">
                            <div className="descriptionRow"><div className="descriptionKey">Image ID</div><div className="descriptionValue"> {image.id}</div></div>
                            <div className="descriptionRow"><div className="descriptionKey">Title</div><div className="descriptionValue"> {image.title}</div></div>
                            <div className="descriptionRow"><div className="descriptionKey">Album ID</div><div className="descriptionValue"> {image.albumId}</div></div>             
                        </div>
                    </div>
                    ) : (
                        <FailureOverlay/>
                    )
                )
            }
        </div>
    )
    
}