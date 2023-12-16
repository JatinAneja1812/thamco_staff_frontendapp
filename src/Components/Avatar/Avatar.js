import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import UserDetailsModal from '../Modals/UserDetails/UserDetailsModel';

const StyledAvatar = ({ image = sessionStorage.getItem('picture') }) => {
  
  const [isModelOpen, setModelOpen ] = useState(false);
  const [details, setDetails] = useState([]);

  const REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL = process.env.REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL;   // Production Base API
  
  const fetchData = () => {
    //UserProfiles API : "https://localhost:7276/api/UserProfiles/GetStaffDetails"
    // BFF (Local): https://localhost:7259/api/Users/GetStaffUser

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/Users/GetStaffUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        Email: sessionStorage.getItem("email"),
      },
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          var errorMessage = await httpResponse.text();
          throw new Error(errorMessage);
        }

        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }

        return httpResponse.text();
      })
      .then(
        (result) => {
          let staff = JSON.parse(result);
          setDetails(staff);
          setModelOpen(true);
        },
        (error) => {
          console.error("Error fetching data:", error.message);
        }
      )
  };
  
  const showModal = () => {
    fetchData();
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