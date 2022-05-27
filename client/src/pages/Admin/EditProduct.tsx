import React from 'react'
import {
  Accordion,
  Typography,
  Button,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonGroup,
  Modal,
  Chip,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Product } from '../../../../server/resources/product/product.model';
import { useProduct } from '../../contexts/ProductsContext';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface AdminPageAccordionProps {
  product: Product;
  expanded?: boolean;
  saveAction: (product: Product) => void;
  deleteAction: (productId: number) => void;
}



function EditProduct ({
  product,
  expanded,
  saveAction,
  deleteAction,
}: AdminPageAccordionProps) {
  const [open, setOpen] = useState(expanded ?? false);
  const [openModal, setOpenModal] = useState(false);
  const { categories, prods } = useProduct();
  const [description, setDescription] = useState<string>("")


  


  const handleOpen = (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => setOpen(!open);


  const matches = useMediaQuery('(max-width: 440px)');

  return (
    <Accordion onChange={handleOpen} expanded={open}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            margin: '1rem 0',
          }}
        >
           {/* {prods.map((category, index) => ( */}
           {/* {prods.map((product) =>  */}
               <Box
              //  key={product._id}
               sx={{
                 gap: '0.5rem',
                 display: 'flex',
                 flexDirection: 'row',
                 bgcolor: '#fffff',
                 borderColor: '#0EDFE6',
                 color: ' black',
   
                 '@media screen and (max-width: 440px)': {
                   flexDirection: 'column',
                 },
               }}
             >
              
               <img src={product.photo} width="48px" alt=""></img>
               {open ? (
                 <>
                   <input
                     type="text"
                     value={product.title}
                     onChange={(e) => {
                     }}
                     onClick={(e) => e.stopPropagation()}
                   />
                   {/* {!product.titleValid && ( */}
                     {/* <Typography sx={{ color: 'red' }}>
                       Vänligen ange en titel.
                     </Typography> */}
                   {/* )} */}
                 </>
               ) : (
                 <Typography>{product.title}</Typography>
               )}
             </Box>
           
          {/* //  )} */}
       
          {/* {open ? (
            <Button>Stäng</Button>
          ) : (
            // <Box>
            //   {isProductEdited(product, productState) ? (
            //     <Chip label="OSPARAD" variant="outlined" />
            //   ) : null}
            //   <Button startIcon={<EditIcon />}>Redigera</Button>
            // </Box>
          )} */}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ margin: '1rem 0' }}>
          <img
            style={{ width: 100, height: 100 }}
            src={product.photo}
            alt=""
          ></img>
        </Box>
        <Typography sx={{ marginBottom: '2ex' }}>Bild URL:&nbsp;</Typography>
        <input
          type="url"
          value={product.photo}
          onChange={(e) => {
           
          }}
        />
        {/* {!productState.imgURLValid && ( */}
          {/* <Typography sx={{ color: 'red' }}>
            Vänligen ange en bildadress.
          </Typography> */}
        {/* )} */}
        <Box>
          <Typography>Beskrivning</Typography>
          <textarea
            onChange={(e) => {
            
            }}
            // value={productState.description}
          />
          {/* {!productState.descriptionValid && ( */}
            {/* <Typography sx={{ color: 'red' }}>
              Vänligen ange en beskrivning.
            </Typography> */}
          {/* )} */}
          <Box sx={{ margin: '1rem 0' }}>
            <Typography>Redigera pris</Typography>
            <input
              type="number"
              min="1"
              value={!isNaN(product.price) ? product.price : ''}
              onChange={(e) => {
                const price = parseFloat(e.target.value);
                // dispatch({
                //   type: ProductEditReducerType.Update,
                //   payload: {
                //     key: 'price',
                //     value: price > 0 ? price : NaN,
                //   },
                // });
              }}
            />
            {/* {!productState.priceValid && ( */}
              {/* <Typography>Vänligen ange ett pris.</Typography> */}
            {/* )} */}
          </Box>
        </Box>
        
        
        
    
        <Box sx={{ margin: '1rem 0' }}>
          <Typography>Redigera kategori</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ButtonGroup
              orientation={matches ? 'vertical' : 'horizontal'}
              sx={{
                bgcolor: '#fffff',
                borderColor: '#0EDFE6',
                color: ' black',

                '@media screen and (max-width: 440px)': {
                  flexDirection: 'column',
                },
              }}
              aria-label="button group"
            > 
              {categories.map((category, index) => (
                <Button
                  key={index}
                  // variant={
                  //   category === productState.categories
                  //     ? 'contained'
                  //     : 'outlined'
                  // }
                  // onClick={() =>
                  //   // dispatch({
                  //   //   type: ProductEditReducerType.Update,
                  //   //   payload: { key: 'category', value: category },
                  //   // })
                  // }
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          {/* {!productState.categoryValid && ( */}
            {/* <Typography sx={{ color: 'red' }}>
              Vänligen välj kategori.
            </Typography> */}
          {/* )} */}
        </Box>
        <Box>
          <Button
            // disabled={!formValid}
            startIcon={<Save />}
            onClick={() => {
              // saveAction(productState);
              setOpen(false);
            }}
          >
            Spara
          </Button>
          <Button
            // disabled={!formValid}
            startIcon={<RestartAltIcon />}
            // onClick={() =>
            //   // dispatch({
            //   //   type: ProductEditReducerType.Reset,
            //   //   payload: { product: product },
            //   // })
            // }
          >
            Återställ
          </Button>
          <Button
            startIcon={<DeleteForeverIcon />}
            onClick={() => setOpenModal(true)}
          >
            Ta bort produkt
          </Button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 250,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography>
                Är du säker på att du vill ta bort produkten?
              </Typography>
              {/* <Button
                onClick={(e) => {
                  deleteAction(prods?._id);
                  setOpenModal(false);
                  setOpen(false);
                  e.stopPropagation();
                }}
              >
                Ja
              </Button> */}
              <Button onClick={() => setOpenModal(false)}>Nej</Button>
            </Box>
          </Modal>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default EditProduct