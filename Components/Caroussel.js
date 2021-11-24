import Carousel from "react-multi-carousel";
import Card from './Card'
import "react-multi-carousel/lib/styles.css";

function Caroussel({elements}) {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1281 },
          items: 4,
          partialVisibilityGutter: 40,
          slidesToSlide: 3 
        },
        laptop: {
          breakpoint: {max:1280, min:860},
          items: 3,
          partialVisibilityGutter: 40,
          slidesToSlide:2
        },
        tablet: {
          breakpoint: { max: 850, min: 580 },
          items: 2,
          slidesToSlide: 2
        },
        mobile: {
          breakpoint: { max: 570, min: 0 },
          items: 1,
          partialVisibilityGutter: 40,
          slidesToSlide: 1 
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
        {elements.map(({nftId, watchingFee, price, usdPrice, viewers, metadata}) => <Card key={nftId} id={nftId} src = {metadata.imgLink} title={metadata.title} description={metadata.description} srcVid={metadata.videoLink} watchingFee={watchingFee} price={price} usdPrice={usdPrice} viewers={viewers} large/>)}
      </Carousel>
    )
      
}

export default Caroussel

