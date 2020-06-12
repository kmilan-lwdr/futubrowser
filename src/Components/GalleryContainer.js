import React, { useState, useEffect } from 'react'
import PaginationBar from './PaginationBar'
import LoadingOverlay from './LoadingOverlay'
import FailureOverlay from './FailureOverlay'
import ThumbnailImage from './ThumbnailImage'
import axios from 'axios'

const LIMIT = 40;

export default function GalleryContainer(props) {
    // Setting initial state
    const loadingState = {
        loading: true,
    }

    const [thumbnailData, setThumbnailData] = useState({
        thumbnails: [],
        totalCount: 1,
        limit: LIMIT
    });

    const [pageData, setPageData] =useState( {
        currentPage: 1
    });

    const [loading, setLoadingState] = useState(loadingState);   

    // Fetch thumbnails when currentPage changes
    useEffect(() => {

        const getThumbnails = async () => {   
            setLoadingState(true);
            let page = Number(props.match.params.page);
            setPageData({currentPage: page ? page : 1})
            await axios
            .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${LIMIT}`,
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
                setThumbnailData({
                    thumbnails: response.data,
                    totalCount: response.headers["x-total-count"],
                    limit: LIMIT
                });
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                setLoadingState(false);
            });
        }

        getThumbnails();

    }, [pageData.currentPage, props.match.params.page]) 

    // Return a table with some data from the API.
    return  (
        <div className="container">
            {
                loading ? (
                    <LoadingOverlay/>
                ) : (
                    thumbnailData.thumbnails.length > 0 ? (
                        <div>
                            <div className="row galleryGrid">
                                {
                                    thumbnailData.thumbnails.map((value, index) => 
                                        <ThumbnailImage
                                            id={value.id}
                                            url={value.thumbnailUrl}
                                            alt={value.id}
                                            title={value.title}
                                            key={index}
                                        />)
                                }                          
                            </div>
                            
                            <PaginationBar 
                                currentPage={pageData.currentPage}
                                totalPages={Math.ceil(thumbnailData.totalCount / LIMIT)}
                                url='/gallery/'
                            />
                            
                        </div>
                    ) : (
                        <FailureOverlay/>
                    )
                )
            }
        </div>
            
    )
}