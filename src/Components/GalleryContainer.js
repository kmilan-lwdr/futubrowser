import React, { useState, useEffect } from 'react'
import PaginationBar from './PaginationBar'
import InfoOverlay from './InfoOverlay'
import ThumbnailImage from './ThumbnailImage'
import queryString from 'query-string';
import axios from 'axios'

// Default fallback limit
const LIMIT = 40;

// Accepted query params
const QUERYPARAMS = ["_page", "_limit", "albumId"];

var _ = require('lodash');

export default function GalleryContainer(props) {

    // Setting initial states
    const loadingState = {
        loading: true,
    }

    const [thumbnailData, setThumbnailData] = useState({
        thumbnails: [],
        totalCount: 1
    });

    const [queryData, setQueryData] = useState( {       
        _page: 1,
        _limit: LIMIT,
        albumId: undefined
          
    });

    const [loading, setLoadingState] = useState(loadingState);   

    

    // Fetch thumbnails when search parameters change
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
        
        const getThumbnails = async () => {   
            setLoadingState(true);

            let queryParams = queryString.parse(props.location.search);
            queryParams = _.pick(queryParams, QUERYPARAMS);

            // Ensure valid values
            let page = Number(queryParams._page);
            let limit = Number(queryParams._limit);
            queryParams._page = page ? page : 1;
            queryParams._limit = limit ? limit : LIMIT;
            queryParams.albumId = queryParams.albumId ?? undefined;

            let queryStr = "?" + queryString.stringify(queryParams, {skipEmptyString: true, skipNull: true});     
            
            // Should move URLs to external config
            await axios
            .get(`https://jsonplaceholder.typicode.com/photos${queryStr !== "?" ? queryStr : ""}`, request)
            .then(response => {
                setThumbnailData({
                    thumbnails: response.data,
                    totalCount: response.headers["x-total-count"]
                });
                setQueryData(queryParams);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoadingState(false);
            });
        }

        getThumbnails();

    }, [props.location.search]) 

    return  (
        <div className="container">
            {
                loading ? (
                    <InfoOverlay text="Please wait..." iconClass="loadingSpinner"/>
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
                                query={queryData}
                                totalPages={Math.ceil(thumbnailData.totalCount / queryData._limit)}
                                path='/gallery'
                            />
                            
                        </div>
                    ) : (
                        <InfoOverlay text="Unable to fetch data" iconClass="failureIcon"/>
                    )
                )
            }
        </div>
            
    )
}