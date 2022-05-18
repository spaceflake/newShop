import { Box, Tabs, Tab, Container, Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import AdminBar from "./AdminBar";
import CartButton from "./CartButton";

interface HeaderProps {}

const TabValues: string[] = ["/", "/products", "/about"];

const filteredValue = (value: string) =>
  TabValues.includes(value) ? value : false;

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(filteredValue(useLocation().pathname));

  const currentLocation = filteredValue(useLocation().pathname);
  if (currentLocation !== value) {
    setValue(currentLocation);
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  const { user, logout } = useUser();

  return (
    <>
      {!!user?.isAdmin && <AdminBar />}

      <Container maxWidth="md" sx={{ padding: "0,2rem", mb:1,mt:2 }}>
        <Box sx={{ width: "100%" }}>
          {!!user && <Typography sx={{color:"#c900c1"}}>Du är nu inloggad som: {user?.username}</Typography>}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Tabs
            sx={{
              "@media screen and (max-width: 440px)": {
                padding: "0",
                marginLeft: "-25px",
              },
            }}
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="/" label="Hem" />
            <Tab value="/products" label="Produkter" />
          </Tabs>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              "@media screen and (max-width: 480px)": {
                marginRight: "-10px",
              },
            }}
          >
            {!user ? (
              <Link to="/login">
                <Button
                  sx={{
                    bgcolor: "white",
                    border: "none",
                    color: " black",
                    minWidth: "1px",
                    "&:hover": {
                      bgcolor: "#dadcd9",
                      border: "none",
                      color: " black",
                    },
                    "@media screen and (max-width: 480px)": {
                      fontSize: "0",
                      padding: "0",
                      bgcolor: "transparent",
                      textalign: "none",
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                    },
                  }}
                  variant="outlined"
                  endIcon={
                    <AccountCircleIcon
                      sx={{
                        padding: "0",
                        height: "2.5rem",
                        width: "2.5rem",
                        "@media screen and (max-width: 440px)": {
                          marginRight: "-30px",
                        },
                      }}
                      color="warning"
                    />
                  }
                >
                  Logga in
                </Button>
              </Link>
            ) : (
              <Button
                sx={{
                  bgcolor: "white",
                  border: "none",
                  color: " black",
                  minWidth: "1px",
                  "&:hover": {
                    bgcolor: "#dadcd9",
                    border: "none",
                    color: " black",
                  },
                  "@media screen and (max-width: 480px)": {
                    fontSize: "0",
                    padding: "0",
                    bgcolor: "transparent",
                    textalign: "none",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  },
                }}
                variant="outlined"
                endIcon={
                  <AccountCircleIcon
                    sx={{
                      padding: "0",
                      height: "2.5rem",
                      width: "2.5rem",
                      "@media screen and (max-width: 440px)": {
                        marginRight: "-30px",
                      },
                    }}
                    color="success"
                  />
                }
                onClick={() => logout()}
              >
                Logga ut
              </Button>
            )}

            <CartButton />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Header;
