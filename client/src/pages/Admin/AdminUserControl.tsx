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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';

import axios, { AxiosResponse } from 'axios';

const AdminUserControl = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const { allUsers } = useUser();
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

  useEffect(() => {});

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
      <List>
        {allUsers.map((user: any) => (
          <Box key={user._id}>
            <Paper elevation={3}>
              <Box>
                <Typography variant="h5">
                  {user.firstName + ' ' + user.lastName}
                </Typography>
                <Typography></Typography>
                <button
                  onClick={() => {
                    setSelectedUser(user._id);
                    handleDeleteDrawerOpen();
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setSelectedUser(user._id);
                    handleEditDrawerOpen();
                  }}
                >
                  Make Admin
                </button>
              </Box>
            </Paper>
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
          </Box>
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
