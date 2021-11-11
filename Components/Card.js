
function Card({src, title, description, srcVid}) {
    return (
        <div className='card'>
            <div className='thumbnail'>
                <img src={src} alt={title} />
            </div>
            <div className='description'>
                <h1>{title}</h1>
                <span>{description}</span>
            </div>
        </div>

    )
}

export default Card