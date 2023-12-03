import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import UserDetailsModal from '../Modals/UserDetails/UserDetailsModel';

const StyledAvatar = ({ image = sessionStorage.getItem('picture'), details }) => {
  
  const [isModelOpen, setModelOpen ] = useState(false);

  const showModal = () => {
    setModelOpen(true);
  }
  const closeModal = () => {
    setModelOpen(!isModelOpen);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar src={image} alt="User Avatar" sx={{ width: 50, height: 50 }}  onClick={showModal}/>
      <IconButton
        onClick={showModal}
        style={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          backgroundColor: '#3498db',
          borderRadius: '50%',
          padding: 0,
          color: '#ffffff',
        }}
      >
        <InfoIcon />
      </IconButton>
      <UserDetailsModal open={isModelOpen} details={details} closeModal={closeModal} />
    </div>
  );
};

export default StyledAvatar;