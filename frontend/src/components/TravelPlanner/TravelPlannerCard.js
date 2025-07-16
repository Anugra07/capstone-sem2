import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AutocompleteCity from './AutocompleteCity';
import DatePicker from './DatePicker';
import BudgetSlider from './BudgetSlider';
import GroupSizeSelector from './GroupSizeSelector';
import CircularProgress from '@mui/material/CircularProgress';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function TravelPlannerCard({ onPlan }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(10000);
  const [groupSize, setGroupSize] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          startDate,
          endDate,
          budget,
          groupSize
        })
      });
      const data = await res.json();
      setLoading(false);
      
      if (data.error) {
        console.log('❌ API Error:', data.error);
        onPlan && onPlan({ error: data.error });
      } else {
        // Log the raw Gemini answer
        const answer = data.answer || '';
        console.log('🟢 Gemini Raw Answer:', answer);
        
        // Enhanced parsing: try multiple approaches
        console.log('🔢 Attempting to parse sections...');
        
        let steps = '', accommodations = '', foods = '';
        
        // Method 1: Split by numbered sections (improved)
        const sections = answer.split(/\n\d+\. /).map((s, i) => {
          if (i === 0) return s;
          return (i + '. ' + s);
        });
        console.log('🔢 Method 1 - Numbered sections:', sections.length);
        
        // Method 2: Split by common section headers
        const sectionHeaders = answer.split(/\n(?:.*?(?:cheapest|travel|way|homestay|accommodation|eatery|food|restaurant).*?)\n/i);
        console.log('🔢 Method 2 - Header sections:', sectionHeaders.length);
        
        // Method 3: Look for specific patterns in the entire text
        const cheapestMatch = answer.match(/(?:.*?cheapest.*?way.*?)(?=\n\d+\.|\n\n|$)/is);
        const accommodationMatch = answer.match(/(?:.*?homestay.*?accommodation.*?)(?=\n\d+\.|\n\n|$)/is);
        const foodMatch = answer.match(/(?:.*?eatery.*?food.*?restaurant.*?)(?=\n\d+\.|\n\n|$)/is);
        
        console.log('🔢 Method 3 - Pattern matches:', {
          cheapest: !!cheapestMatch,
          accommodation: !!accommodationMatch,
          food: !!foodMatch
        });
        
        // Try to extract sections using multiple methods
        sections.forEach((section, index) => {
          console.log(`📋 Section ${index}:`, section.substring(0, 100) + '...');
          
          const sectionLower = section.toLowerCase();
          
          // More specific matching to avoid conflicts
          if (sectionLower.includes('cheapest') && sectionLower.includes('way')) {
            steps = section;
            console.log('✅ Found Steps Section (Method 1)');
          }
          else if (sectionLower.includes('homestay') || sectionLower.includes('accommodation')) {
            accommodations = section;
            console.log('✅ Found Accommodations Section (Method 1)');
          }
          else if (sectionLower.includes('eatery') || sectionLower.includes('food')) {
            foods = section;
            console.log('✅ Found Foods Section (Method 1)');
          }
        });
        
        // If Method 1 didn't work, try Method 3
        if (!steps && cheapestMatch) {
          steps = cheapestMatch[0];
          console.log('✅ Found Steps Section (Method 3)');
        }
        if (!accommodations && accommodationMatch) {
          accommodations = accommodationMatch[0];
          console.log('✅ Found Accommodations Section (Method 3)');
        }
        if (!foods && foodMatch) {
          foods = foodMatch[0];
          console.log('✅ Found Foods Section (Method 3)');
        }
        
        console.log('📊 Final Parsed Data:', {
          steps: steps ? steps.substring(0, 100) + '...' : 'NOT FOUND',
          accommodations: accommodations ? accommodations.substring(0, 100) + '...' : 'NOT FOUND',
          foods: foods ? foods.substring(0, 100) + '...' : 'NOT FOUND'
        });
        
        // Log the parsed sections
        console.log('🟢 Parsed Sections:', { steps, accommodations, foods });
        onPlan && onPlan({ 
          from, 
          to, 
          startDate, 
          endDate, 
          budget, 
          groupSize, 
          answer, 
          steps, 
          accommodations, 
          foods 
        });
      }
    } catch (err) {
      console.error('🔥 Error in handleSubmit:', err);
      setLoading(false);
      onPlan && onPlan({ error: 'Failed to fetch travel options' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Card
        elevation={12}
        sx={{
          width: { xs: '100%', sm: 500, md: 550 },
          maxWidth: '100%',
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FF6B35 0%, #E55100 50%, #FF6B35 100%)',
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <FlightTakeoffIcon 
              sx={{ 
                fontSize: 48, 
                color: 'primary.main', 
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(255,107,53,0.3))'
              }} 
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontFamily: 'Poppins, Arial, sans-serif',
                fontSize: { xs: 24, md: 28 },
                mb: 1,
              }}
            >
              Plan Your Journey
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: 16,
                fontFamily: 'Inter, Arial, sans-serif',
              }}
            >
              Discover the best routes, accommodations, and local experiences
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* From Field */}
            <AutocompleteCity
              label="From"
              value={from}
              onChange={setFrom}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 3,
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 16px rgba(255,107,53,0.12)',
                  },
                  '&.Mui-focused': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 20px rgba(255,107,53,0.15)',
                  }
                },
              }}
            />

            {/* To Field */}
            <AutocompleteCity
              label="To"
              value={to}
              onChange={setTo}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 3,
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 16px rgba(255,107,53,0.12)',
                  },
                  '&.Mui-focused': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 20px rgba(255,107,53,0.15)',
                  }
                },
              }}
            />

            {/* Date Fields */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker 
                label="Start Date" 
                value={startDate} 
                onChange={setStartDate}
                sx={{
                  flex: 1,
                  '& .MuiInputBase-root': {
                    borderRadius: 3,
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }
                }}
              />
              <DatePicker 
                label="End Date" 
                value={endDate} 
                onChange={setEndDate}
                sx={{
                  flex: 1,
                  '& .MuiInputBase-root': {
                    borderRadius: 3,
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }
                }}
              />
            </Box>

            {/* Budget Slider */}
            <BudgetSlider 
              value={budget} 
              onChange={setBudget}
              sx={{
                '& .MuiSlider-root': {
                  color: 'primary.main',
                }
              }}
            />

            {/* Group Size */}
            <GroupSizeSelector 
              value={groupSize} 
              onChange={setGroupSize}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 3,
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }
              }}
            />

            <Divider sx={{ my: 2, opacity: 0.3 }} />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !from || !to}
              sx={{
                height: 56,
                borderRadius: 3,
                fontWeight: 600,
                fontFamily: 'Poppins, Arial, sans-serif',
                fontSize: 16,
                background: 'linear-gradient(90deg, #FF6B35 0%, #E55100 100%)',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(255,107,53,0.25)',
                textTransform: 'none',
                letterSpacing: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(255,107,53,0.35)',
                  background: 'linear-gradient(90deg, #E55100 0%, #FF6B35 100%)',
                },
                '&:disabled': {
                  opacity: 0.6,
                  transform: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              ) : (
                <FlightTakeoffIcon sx={{ mr: 1, fontSize: 20 }} />
              )}
              {loading ? 'Planning Your Trip...' : 'Plan My Journey'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TravelPlannerCard; 