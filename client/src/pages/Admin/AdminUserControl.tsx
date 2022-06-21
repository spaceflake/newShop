import {
  Container,
  Button,
  Box,
  List,
  Paper,
  Typography,
  Drawer,
  IconButton,
  styled,
  Chip,
  ListItem,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import type { User } from '@shared/types';

import axios, { AxiosResponse } from 'axios';

const AdminUserControl = () => {
  const [selectedUser, setSelectedUser] = useState<string>();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { allUsers, getAllUsers } = useUser();
  console.log(allUsers);

  const handleDeleteDrawerOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteDrawerClose = () => {
    setOpenDelete(false);
  };
  const handleEditDrawerOpen = () => {
    setOpenEdit(true);
  };
  const handleEditDrawerClose = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const editUser = async () => {
    await axios
      .put('/api/user/' + selectedUser, {
        isAdmin: true,
      })
      .then(
        (res: AxiosResponse) => {
          console.log(res);
        },
        () => {
          console.log('Failure');
        }
      );
  };
  const deleteUser = async () => {
    await axios
      .delete('/api/user/' + selectedUser, {
        data: {
          userId: selectedUser,
        },
      })
      .then(
        (res: AxiosResponse) => {
          console.log(res);
          window.location.reload();
        },
        () => {
          console.log('Failure');
        }
      );
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <Typography variant="h4">Customers</Typography>
      <List>
        {allUsers.map((user: User) => (
          <ListItem
            key={user.id}
            secondaryAction={
              <IconButton edge="end" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            }
          >
            <Box>
              <Typography variant="h5">
                {user.firstName + ' ' + user.lastName}
              </Typography>
              <Typography variant="body1">
                {user.isAdmin ? 'Admin' : 'Customer'}
              </Typography>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem
                  onClick={() => {
                    setSelectedUser(user.id);
                    handleDeleteDrawerOpen();
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSelectedUser(user.id);
                    handleEditDrawerOpen();
                  }}
                >
                  {/* {selectedUser. 'Make Admin'} */}
                </MenuItem>
                {/* <button
                  onClick={() => {
                    setSelectedUser(user.id);
                    handleDeleteDrawerOpen();
                  }}
                >
                  Delete
                </button> */}

                {/* <button
                  onClick={() => {
                    setSelectedUser(user.id);
                    handleEditDrawerOpen();
                  }}
                >
                  Make Admin
                </button> */}
              </Menu>
              {user.adminRequested && !user.isAdmin && (
                <Chip label="Admin requested" />
              )}
            </Box>
            <Drawer variant="persistent" anchor="right" open={openDelete}>
              <DrawerHeader>
                <IconButton onClick={handleDeleteDrawerClose}></IconButton>
                <Typography>
                  Are you sure you want to delete this user?
                </Typography>
              </DrawerHeader>
              <Button
                type="button"
                onClick={() => {
                  handleDeleteDrawerClose();
                }}
              >
                No
              </Button>
              <Button
                type="button"
                onClick={() => {
                  deleteUser();
                  handleDeleteDrawerClose();
                }}
              >
                Yes
              </Button>
            </Drawer>
            <Drawer variant="persistent" anchor="right" open={openEdit}>
              <DrawerHeader>
                <IconButton onClick={handleEditDrawerClose}></IconButton>
                <Typography>
                  Are you sure you want to make this user an admin?
                </Typography>
              </DrawerHeader>
              <Button
                type="button"
                onClick={() => {
                  handleEditDrawerClose();
                }}
              >
                No
              </Button>
              <Button
                type="button"
                onClick={() => {
                  editUser();
                  handleEditDrawerClose();
                }}
              >
                Yes
              </Button>
            </Drawer>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-start',
}));

export default AdminUserControl;
