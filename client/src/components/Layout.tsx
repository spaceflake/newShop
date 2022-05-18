import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import Header from './Header/Header'

function Layout() {
  return (
    <Container maxWidth={false} disableGutters={true} sx={{ display:"flex", flexDirection:"column", height:"100%"}}>
      <Header />
      <Container component="main" disableGutters={true} sx={{flexGrow:"1"}}>
      <Outlet />
      </Container>
      <Footer />
    </Container>
  )
}

export default Layout
