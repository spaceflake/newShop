import { Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import commercial1 from '../assets/CarouselPictures/commercial1.jpeg';
import commercial2 from '../assets/CarouselPictures/commercial2.jpg';
import commercial3 from '../assets/CarouselPictures/commercial3.jpg';
import '../App.css';

interface Item {
  image: string;
}

interface Props {
  item: Item;
}

function ShowCarousel() {
  let images = [
    {
      image: commercial1,
    },
    {
      image: commercial2,
    },
    {
      image: commercial3,
    },
  ];

  return (
    <Container sx={{ padding: '0px' }}>
      <Carousel
        interval={3000}
        indicators={false}
        sx={{
          width: '100%',
          margin: 'auto',
        }}
      >
        {images.map((item, i) => (
          <ShowImages key={i} item={item} />
        ))}
      </Carousel>
    </Container>
  );
}

function ShowImages(props: Props) {
  return (
    <img
      style={{
        width: '100%',
      }}
      src={props.item.image}
      alt=""
    />
  );
}

export default ShowCarousel;
