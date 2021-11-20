
import { ShimmerThumbnail } from "react-shimmer-effects";
function Loading() {
    return (
        <div className='loading'>
            <ShimmerThumbnail height={250} width={300} rounded />;
            <ShimmerThumbnail height={250} width={300} rounded />;
            <ShimmerThumbnail height={250} width={300} rounded />;
            <ShimmerThumbnail height={250} width={300} rounded />;
        </div>
    )
}

export default Loading
