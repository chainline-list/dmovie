import { useState } from 'react'
import { useSelector } from 'react-redux'

function VideoScreen() {

    const videoData = useSelector(state => state.video)
    console.log(videoData)
    return (
        <div className='videoScreen'>

            <video src={videoData.srcVid} autoPlay controls={true}></video>

        </div>
    )
}

export default VideoScreen
