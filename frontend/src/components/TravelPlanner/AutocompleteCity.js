import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputAdornment from '@mui/material/InputAdornment';

const cityList = [
  'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Spiti Valley', 'Hampi', 'Kerala', 'Shillong', 'Rishikesh', 'Leh', 'Jaisalmer', 'Coorg', 'Tawang', 'Ziro', 'Munnar', 'Pelling', 'Chopta', 'Majuli', 'Gokarna', 'Pachmarhi', 'Kodaikanal', 'Dzukou Valley', 'Khajjiar', 'Valparai', 'Cherrapunji', 'Ladakh', 'Andaman', 'Bir Billing', 'Kasol', 'Tirthan Valley', 'Sandakphu', 'Araku Valley', 'Haflong', 'Lonavala', 'Mahabaleshwar', 'Mount Abu', 'Rann of Kutch', 'Sundarbans', 'Kanha', 'Pench', 'Wayanad', 'Alleppey', 'Varkala', 'Horsley Hills', 'Yercaud', 'Dandeli', 'Agumbe', 'Kudremukh', 'Kinnaur', 'Kalimpong', 'Lachung', 'Zanskar', 'Auli', 'Mussoorie', 'Nainital', 'Manali', 'Shimla', 'Darjeeling', 'Gangtok', 'Ooty', 'Puri', 'Konark', 'Hampi', 'Badami', 'Pattadakal', 'Mahabalipuram', 'Rameswaram', 'Kanyakumari', 'Madurai', 'Thanjavur', 'Puducherry', 'Chikmagalur', 'Sakleshpur', 'Kudremukh', 'Gandikota', 'Hampi', 'Vijayawada', 'Vizag', 'Araku', 'Srisailam', 'Nagarjuna Sagar', 'Warangal', 'Bhadrachalam', 'Basar', 'Adilabad', 'Nizamabad', 'Karimnagar', 'Medak', 'Mahbubnagar', 'Khammam', 'Kurnool', 'Anantapur', 'Kadapa', 'Nellore', 'Tirupati', 'Chittoor', 'Rajahmundry', 'Kakinada', 'Eluru', 'Machilipatnam', 'Narsapur', 'Bhimavaram', 'Tadepalligudem', 'Tanuku', 'Palakollu', 'Amalapuram', 'Srikakulam', 'Vizianagaram', 'Parvathipuram', 'Bobilli', 'Salur', 'Rayagada', 'Koraput', 'Jeypore', 'Malkangiri', 'Nabarangpur', 'Kalahandi', 'Balangir', 'Sambalpur', 'Jharsuguda', 'Sundargarh', 'Rourkela', 'Bargarh', 'Boudh', 'Subarnapur', 'Nuapada', 'Nayagarh', 'Angul', 'Dhenkanal', 'Kendujhar', 'Mayurbhanj', 'Balasore', 'Bhadrak', 'Jajpur', 'Kendrapara', 'Jagatsinghpur', 'Cuttack', 'Puri', 'Khordha', 'Bhubaneswar', 'Berhampur', 'Ganjam', 'Gajapati', 'Rayagada', 'Koraput', 'Nabarangpur', 'Malkangiri', 'Kalahandi', 'Nuapada', 'Balangir', 'Sonepur', 'Boudh', 'Angul', 'Dhenkanal', 'Kendujhar', 'Mayurbhanj', 'Balasore', 'Bhadrak', 'Jajpur', 'Kendrapara', 'Jagatsinghpur', 'Cuttack', 'Khordha', 'Bhubaneswar', 'Berhampur', 'Ganjam', 'Gajapati'
];

function AutocompleteCity({ label, value, onChange }) {
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
          InputProps={{
            ...params.InputProps,
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