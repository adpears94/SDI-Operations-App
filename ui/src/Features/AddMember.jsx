import React, { useContext, useState } from 'react';
import { MemberContext } from '../Components/MemberContext';
import { Button, Modal, Box, Paper, Typography } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';

const PostMemberModal = props => {
  const {
    role,
    post,
    weapon_req,
    cert_req,
    post_id,
    fetchSchedule,
    currentDate,
    shift,
  } = props;
  const { API, data } = useContext(MemberContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState({});

  //  console.log(cert_req)
  let weaponsReq = weapon_req.split(' ');

  const filterFlight = data.filter(user => {
    let wepResults = weaponsReq.map(wep => {
      let tests = user.weapons.map(usrWep => wep.includes(usrWep.weapon));
      // console.log('inside filter', tests, user)
      if (tests.includes(true)) {
        return true;
      } else {
        return false;
      }
    });
    let certResults = user.certs.map(cert => cert.id >= cert_req[0].id);
    // console.log('results', certResults)
    if (wepResults.includes(true) && certResults.includes(true)) {
      return true;
    } else {
      return false;
    }
  });

  // console.log('flight filter', filterFlight, weapon_req)

  const style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '50vw',
    height: 'auto',
    minHeight: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000000',
    boxShadow: 24,
    p: 4,
  };

  const patchSchedule = patchInfo => {
    console.log('patching schedule');
    fetch(`${API}/schedule`, {
      method: 'PATCH',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(patchInfo),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        console.log(data);
        // call update for users
        fetchSchedule();
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  // post info to post_schedule
  // position id  // post prop
  // user id // from selected user
  // date // schedul filtered
  // time // schedule filtered
  // role // role prop

  return (
    <>
      <Button
        onClick={() => {
          // console.log(role)
          // console.log(post)
          setOpen(true);
        }}
        variant='outlined'
        color='error'
        size='small'
        sx={{ mr: 10, px: 0, minWidth: 22 }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          style={{ width: 20 }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
          />
        </svg>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Box>
          <Typography sx={{ textAlign: 'center', fontSize: '2.2rem' }}>
            Select Qualifying Airman
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                border: '1px solid grey',
                borderRadius: 3,
                width: '75%',
                p: 3,
              }}
            >
              {currentDate.toDateString()}
              <br />
              Post: {post}
              <br />
              {role === 0 && `Shift: Lead`}
              {role === 1 && `Shift: Alpha`}
              {role === 2 && `Shift: Bravo`}
              {role === 3 && `Shift: Charle`}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 1,
              mt: 10,
              px: 5,
            }}
          >
            {filterFlight.length > 0
              ? filterFlight.map((user, index) => (
                  <Button
                    key={index}
                    sx={
                      selected !== user.id
                        ? { borderRadius: 2.5, p: 0 }
                        : { borderRadius: 2.5, p: 0, border: '2px solid blue' }
                    }
                    onClick={() => setSelected(user.id)}
                  >
                    <Paper
                      sx={[
                        {
                          display: 'flex',
                          alignItems: 'center',
                          // justifyContent: 'space-around',
                          flexDirection: 'row',
                          p: 2,
                          width: '100%',
                          borderRadius: 2.5,
                          backgroundColor: 'none',
                        },
                        {
                          '&:hover': {
                            backgroundColor: '#DCDCDC',
                          },
                        },
                      ]}
                    >
                      <Box
                        sx={{ textAlign: 'left', minWidth: '30%' }}
                      >{`${user.first_name} ${user.last_name}`}</Box>
                      <Box
                        sx={{ textAlign: 'center', minWidth: '30%' }}
                      >{`${user.weapons.map(wep => `${wep.weapon} `)}`}</Box>
                      <Box
                        sx={{ textAlign: 'left', minWidth: '30%' }}
                      >{`${user.certs[0].cert}`}</Box>
                    </Paper>
                  </Button>
                ))
              : `Loading`}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Button
              onClick={() => {
                handleClose();
                // console.log('selected person', selected);
                let shiftTime;
                if (shift === 'Days') shiftTime = '06:00:00';
                if (shift === 'Mids') shiftTime = '18:00:00';
                let postUser = {
                  position_id: post_id,
                  user_id: selected,
                  date: currentDate,
                  time: shiftTime,
                  role: role,
                };
                {
                  role === 0 && (postUser.role = 'Lead');
                }
                {
                  role === 1 && (postUser.role = 'Alpha');
                }
                {
                  role === 2 && (postUser.role = 'Bravo');
                }
                {
                  role === 3 && (postUser.role = 'Charlie');
                }
                console.log('user info to post', postUser);
                patchSchedule(postUser);
              }}
              color='secondary'
              variant='contained'
              sx={{ borderRadius: '30px', mt: 5 }}
            >
              ADD TO SCHEDULE
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PostMemberModal;
