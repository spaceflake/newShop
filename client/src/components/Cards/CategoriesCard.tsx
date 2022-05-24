import React from 'react';

const CategoriesCard = () => {
  return <div>CategoriesCard</div>;
};

export default CategoriesCard;

// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Container,
//   Grid,
//   Typography,
// } from '@mui/material';
// import { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useProduct } from '../../contexts/ProductsContext';

// function CategoriesCard() {
//   const { categories } = useProduct();
//   const splicedCategories = useRef();

//   useEffect(() => {
//     splicedCategories.current = categories.splice(
//       Math.min(categories.length, 3)
//     );
//     return splicedCategories;
//   }, []);

//   // const displayCategories = categories.filter(
//   //   (c) => c !== 'All' && prods.findIndex((p) => p.categories === c) >= 0
//   // );

//   console.log(splicedCategories);
//   // const categoryImages = displayCategories.map(
//   //   (c) => prods.find((p) => p.categories === c)?.photo
//   // );

//   return (
//     <Container sx={{ marginTop: '2rem' }} maxWidth="xl">
//       <Typography
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
//         }}
//       >
//         Kategorier
//       </Typography>
//       <Grid
//         justifyContent="center"
//         alignItems="center"
//         container
//         sx={{ gap: '5rem', margin: '2rem 0' }}
//       >
//         {splicedCategories?.map((c, i) => (
//           <Link key={c} to={'products?category=' + (c as string).toLowerCase()}>
//             <Card sx={{ maxWidth: 300, borderRadius: '1rem' }}>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="340"
//                   // image={categoryImages[i]}
//                 ></CardMedia>
//                 <CardContent>
//                   <Typography gutterBottom variant="h6">
//                     {c}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Link>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// export default CategoriesCard;
