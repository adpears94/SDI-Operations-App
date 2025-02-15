import React, { useState, useContext, useEffect } from 'react';
import { MemberContext } from '../Components/MemberContext';
import {
  Stack,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Modal,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const DataSources = () => {
  const { toggler, setToggler } = useContext(MemberContext);

  useEffect(() => {
    setToggler(false);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {toggler === false ? null : (
        <Stack sx={{ width: '100%' }}>
          <Alert severity='success' spacing={2} mb={2}>
            Your data source, has successfully been added.
          </Alert>
        </Stack>
      )}
      <Typography variant='h3' ml={10} pb={4} sx={{ fontWeight: 'bold' }}>
        Data Sources
      </Typography>
      <Card sx={{ boxShadow: 5, borderRadius: 3, width: 1000, p: 3 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Arming Status
          </Typography>
          <p>
            Upload your .csv file indicating your recent Do Not Arm airment
            status.
          </p>
        </CardContent>
        <CardActions>
          <Upload />
        </CardActions>
      </Card>

      <Card sx={{ boxShadow: 5, mt: 5, borderRadius: 3, width: 1000, p: 3 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Certifications
          </Typography>
          <p>
            Upload your .csv file including airman name and corresponding
            certifications.
          </p>
        </CardContent>
        <CardActions>
          <Upload />
        </CardActions>
      </Card>

      <Card sx={{ boxShadow: 5, mt: 5, borderRadius: 3, width: 1000, p: 3 }}>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Weapon Qualifications
          </Typography>
          <p>
            Upload your .csv file including airman name and current weapons
            certifications.
          </p>
        </CardContent>
        <CardActions>
          <Upload />
        </CardActions>
      </Card>
    </Box>
  );
};

const Upload = () => {
  const { setToggler } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [flag, setFlag] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 530,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  };

  const buttonSX = {
    borderRadius: '30px',
    marginRight: '10px',
  };

  const handleClick = () => {
    setFlag(!flag);
  };

  const handleClickAdd = () => {
    setToggler(true);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='outlined'
        color='secondary'
        sx={buttonSX}
      >
        UPLOAD .CSV
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Box>

          <Typography
            id='modal-modal-description'
            variant='h6'
            sx={{ mt: 1, textAlign: 'center' }}
          >
            ARMING STATUS
          </Typography>
          <Typography
            id='modal-modal-title'
            variant='h4'
            component='h2'
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Add Data Sources
          </Typography>

          <Stack
            direction='column'
            mt={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <p>
              To add a data source, download&nbsp;
              <a
                href='/assets/Template.xlsx'
                download='Template.xlsx'
                style={{ textDecoration: 'none' }}
              >
                this template
              </a>
              , copy and paste your data into the corresponding tabs, save,
              export as a .csv, and re-upload into this container
            </p>
          </Stack>

          {flag === false ? (
            <Stack
              mt={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                border: '1px dashed',
                p: 5,
                borderRadius: '15px',
              }}
            >
              <p style={{ textAlign: 'center' }}>
                Drag file here or click to upload.
              </p>
              <Button
                variant='text'
                color='secondary'
                onClick={() => handleClick()}
              >
                UPLOAD
              </Button>
            </Stack>
          ) : (
            <Stack
              mt={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid',
                p: 5,
                borderRadius: '15px',
              }}
            >
              <p style={{ textAlign: 'center' }}>File name</p>
              <Button
                variant='text'
                color='primary'
                onClick={() => handleClick()}
              >
                REMOVE
              </Button>
            </Stack>
          )}

          <Box mt={3} sx={{ display: 'flex', justifyContent: 'end' }}>
            {flag === false ? (
              <Button
                variant='contained'
                color={flag ? 'secondary' : 'primary'}
                sx={{ borderRadius: '30px' }}
                disabled
              >
                ADD DATA
              </Button>
            ) : (
              <Button
                variant='contained'
                color={flag ? 'secondary' : 'primary'}
                sx={{ borderRadius: '30px' }}
                onClick={() => handleClickAdd()}
              >
                ADD DATA
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
