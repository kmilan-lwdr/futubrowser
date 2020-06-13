import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfoOverlay from './InfoOverlay'
import Image from 'react-graceful-image'
import BackButton from './BackButton'
import { Link } from 'react-router-dom'

function ViewerContainer(props) {

    // Set initial states
    const state = {
        loading: true
    }

    const [imageData, setImageData] = useState({
        image: undefined,
        album: undefined
    });

    const [loading, setLoadingState] = useState(state);

    // Should move URLs to external config
    const photoBaseUrl = "https://jsonplaceholder.typicode.com/photos/";
    const albumBaseUrl = "https://jsonplaceholder.typicode.com/albums/";

    useEffect(() => {

        const request = {
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }

        const getImageData = async () => {  
            await axios
            .get(`${photoBaseUrl}${props.match.params.id}`, request)
            .then(async response => {
                await axios
                .get(`${albumBaseUrl}${response.data.albumId}`, request)
                .then(albumResponse => {
                    setImageData({
                        image: response.data,
                        album: albumResponse.data
                    })
                })
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
                    imageData.image.id ?  (
                    <div>
                        <div className="row">
                            <Image className="imageView"
                                src={imageData.image.url} 
                                width='600' height='600' 
                                alt={imageData.image.id}
                                placeholderColor='#393d3a'/>    
                            
                        </div>
                        <div className="row description">
                            <div className="descriptionRow">
                                <div className="descriptionKey">Title</div>
                                <div className="descriptionValue"> 
                                    {imageData.image.title}
                                </div>
                                </div>
                            <div className="descriptionRow">
                                <div className="descriptionKey">Album</div>
                                <Link to={"/gallery?albumId="+imageData.album.id} className="descriptionValue link"> 
                                    {imageData.album.title}
                                </Link>
                            </div>  
                            <div className="descriptionRow">
                                <BackButton/>
                            </div>           
                            
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