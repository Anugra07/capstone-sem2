import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const tips = [
  {
    icon: <WbSunnyIcon color="warning" />, text: 'Best time to visit Spiti Valley: May to September (clear roads, pleasant weather).'
  },
  {
    icon: <AcUnitIcon color="primary" />, text: 'Hampi is magical in winter (Nov-Feb) with cool evenings and vibrant festivals.'
  },
  {
    icon: <NaturePeopleIcon color="success" />, text: 'Ziro Valley: Attend the Ziro Music Festival in September for a unique cultural experience.'
  },
  {
    icon: <DirectionsWalkIcon color="secondary" />, text: 'Chopta: Trek to Tungnath and Chandrashila for breathtaking Himalayan views.'
  },
  {
    icon: <EmojiNatureIcon color="success" />, text: 'Majuli: Visit during Raas Mahotsav (Nov) to witness traditional Assamese culture.'
  },
];

function TravelTipsSidebar() {
  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 4, background: '#fff', mb: 4 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Travel Tips & Seasonal Insights
      </Typography>
      <List>
        {tips.map((tip, idx) => (
          <ListItem key={idx} sx={{ alignItems: 'flex-start', pb: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>{tip.icon}</ListItemIcon>
            <ListItemText primary={tip.text} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TravelTipsSidebar; 