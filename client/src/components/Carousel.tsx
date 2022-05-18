import { Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import firstDuck from '../assets/CarouselPictures/firstDuck.jpg';
import secondDuck from '../assets/CarouselPictures/secondDuck.jpg';
import thirdDuck from '../assets/CarouselPictures/thirdDuck.jpg';
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
      image: firstDuck,
    },
    {
      image: secondDuck,
    },
    {
      image: thirdDuck,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ padding: '4rem 0' }}>
      <Carousel
        interval={2000}
        indicators={false}
        sx={{ height: '30vw', width: '90%', margin: 'auto' }}
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
