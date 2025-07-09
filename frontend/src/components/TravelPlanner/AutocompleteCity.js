import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputAdornment from '@mui/material/InputAdornment';

const cityList = [
  ...Array.from(new Set([
    'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Spiti Valley', 'Hampi', 'Kerala', 'Shillong', 'Rishikesh', 'Leh', 'Jaisalmer', 'Coorg', 'Tawang', 'Ziro', 'Munnar', 'Pelling', 'Chopta', 'Majuli', 'Gokarna', 'Pachmarhi', 'Kodaikanal', 'Dzukou Valley', 'Khajjiar', 'Valparai', 'Cherrapunji', 'Ladakh', 'Andaman', 'Bir Billing', 'Kasol', 'Tirthan Valley', 'Sandakphu', 'Araku Valley', 'Haflong', 'Lonavala', 'Mahabaleshwar', 'Mount Abu', 'Rann of Kutch', 'Sundarbans', 'Kanha', 'Pench', 'Wayanad', 'Alleppey', 'Varkala', 'Horsley Hills', 'Yercaud', 'Dandeli', 'Agumbe', 'Kudremukh', 'Kinnaur', 'Kalimpong', 'Lachung', 'Zanskar', 'Auli', 'Mussoorie', 'Nainital', 'Manali', 'Shimla', 'Darjeeling', 'Gangtok', 'Ooty', 'Puri', 'Konark', 'Badami', 'Pattadakal', 'Mahabalipuram', 'Rameswaram', 'Kanyakumari', 'Madurai', 'Thanjavur', 'Puducherry', 'Chikmagalur', 'Sakleshpur', 'Gandikota', 'Vijayawada', 'Vizag', 'Araku', 'Srisailam', 'Nagarjuna Sagar', 'Warangal', 'Bhadrachalam', 'Basar', 'Adilabad', 'Nizamabad', 'Karimnagar', 'Medak', 'Mahbubnagar', 'Khammam', 'Kurnool', 'Anantapur', 'Kadapa', 'Nellore', 'Tirupati', 'Chittoor', 'Rajahmundry', 'Kakinada', 'Eluru', 'Machilipatnam', 'Narsapur', 'Bhimavaram', 'Tadepalligudem', 'Tanuku', 'Palakollu', 'Amalapuram', 'Srikakulam', 'Vizianagaram', 'Parvathipuram', 'Bobilli', 'Salur', 'Rayagada', 'Koraput', 'Jeypore', 'Malkangiri', 'Nabarangpur', 'Kalahandi', 'Balangir', 'Sambalpur', 'Jharsuguda', 'Sundargarh', 'Rourkela', 'Bargarh', 'Boudh', 'Subarnapur', 'Nuapada', 'Nayagarh', 'Angul', 'Dhenkanal', 'Kendujhar', 'Mayurbhanj', 'Balasore', 'Bhadrak', 'Jajpur', 'Kendrapara', 'Jagatsinghpur', 'Cuttack', 'Khordha', 'Bhubaneswar', 'Berhampur', 'Ganjam', 'Gajapati', 'Sonepur'
  ]))
];

function AutocompleteCity({ label, value, onChange, sx, InputProps }) {
  return (
    <Autocomplete
      options={cityList}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          sx={{
            fontFamily: 'Inter, Arial, sans-serif',
            background: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(30,58,138,0.04)',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              transition: 'box-shadow 0.2s, border-color 0.2s',
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px #1E3A8A22',
                borderColor: '#1E3A8A',
              },
            },
            '& .MuiInputLabel-root': {
              fontWeight: 500,
              fontFamily: 'Poppins, Arial, sans-serif',
              color: '#666',
              transition: 'all 0.2s',
              '&.Mui-focused': {
                color: '#1E3A8A',
                fontSize: 15,
                transform: 'translate(14px, -9px) scale(0.85)',
              },
            },
            ...sx,
          }}
          InputProps={{
            ...params.InputProps,
            ...InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      )}
      freeSolo
      fullWidth
    />
  );
}

export default AutocompleteCity; 