import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfoOverlay from './InfoOverlay'
import Image from 'react-graceful-image'
import BackButton from './BackButton'

function ViewerContainer(props) {
    const state = {
        loading: true
    }

    const data = {
        image: undefined
    }

    const [image, setImage] = useState(data);
    const [loading, setLoadingState] = useState(state);

    useEffect(() => {

        const getImageData = async () => {  
            await axios
            .get(`https://jsonplaceholder.typicode.com/photos/${props.match.params.id}`,
            {
                mode: 'no-cors',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'same-origin',
              })
            .then(response => {
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

    return (
        <div className="container">
            {
                loading ? (
                    <InfoOverlay text="Please wait..." iconClass="loadingSpinner"/>
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
                            <BackButton/>
                        </div>
                    </div>
                    ) : (
                        <InfoOverlay text="Unable to fetch data" iconClass="failureIcon"/>
                    )
                )
            }
        </div>
    )   
}

export default ViewerContainer