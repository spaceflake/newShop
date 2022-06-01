import postnord from '../assets/ShippingLogos/postnord-short.svg';
import schenker from '../assets/ShippingLogos/schenker-square.jpg';
import instabox from '../assets/ShippingLogos/instabox-short.png';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import klarna from '../assets/PaymentLogos/klarna-square.jpg';
import swish from '../assets/PaymentLogos/swish.svg';
import { SvgIcon } from '@mui/material';

export interface Product {
  title: string;
  information: string;
  id: number;
  category: string;
  price: number;
  imgURL: string;
}

export interface Delivery {
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logo: string;
  id: string;
}

export const deliveryOptions: Delivery[] = [
  {
    name: 'Postnord',
    altText: 'Delivery in mailbox, 1-3 workingdays',
    shippingTime: 3,
    price: 19,
    logo: postnord,
    id: 'postnord',
  },
  {
    name: 'Schenker',
    altText: 'Trackable delivery, 1-2 workingdays',
    shippingTime: 2,
    price: 29,
    logo: schenker,
    id: 'schenker',
  },
  {
    name: 'Instabox',
    altText: 'Delivery to box, 1-2 workingdays',
    shippingTime: 2,
    price: 29,
    logo: instabox,
    id: 'instabox',
  },
];

export interface Payment {
  name: string;
  altText: string;
  id: string;
  logo?: string;
  icon?: typeof SvgIcon;
}

export const paymentOptions: Payment[] = [
  {
    name: 'Klarna',
    altText: 'Split up your payment, pay later, or in the end of the month',
    logo: klarna,
    id: 'klarna',
  },
  {
    name: 'Swish',
    altText: 'Pay easy with your phone',
    logo: swish,
    id: 'swish',
  },
  {
    name: 'Card payment',
    altText: 'Pay with Visa / Mastercard / Maestro',
    icon: CreditCardIcon,
    id: 'card',
  },
];
