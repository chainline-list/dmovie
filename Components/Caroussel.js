import Carousel from "react-multi-carousel";
import Card from './Card'
import "react-multi-carousel/lib/styles.css";

function Caroussel({elements}) {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 590, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} 
        infinite={true}
        autoPlay={ true }
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-10-px"
      >
        {elements.map(({nftId, watchingFee, price, viewers, metadata}) => <Card key={nftId} id={nftId} src = {metadata.imgLink} title={metadata.title} description={metadata.description} srcVid={metadata.videoLink} watchingFee={watchingFee} price={price} viewers={viewers} large/>)}
      </Carousel>
    )
      
}

export default Caroussel

