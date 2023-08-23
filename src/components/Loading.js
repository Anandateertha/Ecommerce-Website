import React from 'react'
import '../styles/Loading.css'

const Loading = () => {
    return (
        <div className="loading-container" style={{marginTop:'250px'}}>
            <div className="loading-spinner"></div>
            <h3>Please wait until we check your credentials...</h3>
        </div>
    )
}

export default Loading
