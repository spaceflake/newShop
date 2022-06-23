import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  styled,
  Typography,
} from '@mui/material';
import type { User } from '@shared/types';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';

import axios, { AxiosResponse } from 'axios';

const AdminUserControl = () => {
  const { allUsers, getAllUsers, isLoading } = useUser();

  const [loadState, setLoadState] = useState(isLoading);

  const [selectedUser, setSelectedUser] = useState<string>();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

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
    setLoadState(true);
    getAllUsers();
    setLoadState(false);
  }, []);

  const editUser = async () => {
    setLoadState(true);
    await axios
      .put('/api/user/' + selectedUser, {
        isAdmin: true,
        adminRequested: false,
      })
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .finally(() => {
        setLoadState(false);
        getAllUsers();
      });
  };
  const deleteUser = async () => {
    setLoadState(true);

    await axios
      .delete('/api/user/' + selectedUser, {
        data: {
          userId: selectedUser,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .finally(() => {
        setLoadState(false);
        getAllUsers();
      });
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>

      <Typography variant="h4">Customers</Typography>
      {loadState ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {allUsers.map((user: User) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => {
                    handleDeleteDrawerOpen();
                    setSelectedUser(user.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Box>
                <Typography variant="h5">
                  {user.firstName + ' ' + user.lastName}
                </Typography>
                {user.adminRequested && !user.isAdmin && (
                  <Chip
                    icon={<HelpIcon />}
                    color="info"
                    component="span"
                    label="Admin requested"
                    onClick={() => {
                      handleEditDrawerOpen();
                      setSelectedUser(user.id);
                    }}
                  />
                )}
                <Typography variant="body1">
                  {user.isAdmin ? 'Admin' : 'Customer'}
                </Typography>
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
      )}
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
