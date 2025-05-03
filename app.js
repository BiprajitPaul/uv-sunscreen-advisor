// app.js - Main application file
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'UV Sunscreen Advisor' });
});

app.post('/check-uv', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    
    // Validate input
    if (!lat || !lng) {
      return res.render('index', { 
        title: 'UV Sunscreen Advisor',
        error: 'Please provide both latitude and longitude.'
      });
    }

    // Call the OpenUV API
    const response = await axios.get('https://api.openuv.io/api/v1/uv', {
      params: {
        lat,
        lng,
        dt: new Date().toISOString()
      },
      headers: {
        'x-access-token': process.env.OPENUV_API_KEY
      }
    });

    // Process the API response
    const uvData = response.data.result;
    const recommendation = getRecommendation(uvData.uv);

    // Render the results page
    res.render('result', {
      title: 'Your UV Results',
      uvData,
      recommendation
    });
  } catch (error) {
    console.error('Error fetching UV data:', error.message);
    
    // Handle API errors or other issues
    res.render('index', {
      title: 'UV Sunscreen Advisor',
      error: 'Failed to fetch UV data. Please try again later.'
    });
  }
});

// Function to determine sunscreen recommendations based on UV index
function getRecommendation(uvIndex) {
  if (uvIndex <= 2) {
    return {
      risk: 'Low',
      needSunscreen: false,
      message: 'Low risk of harm from UV radiation. No sunscreen required for most skin types.',
      spf: 'None',
      colorClass: 'low'
    };
  } else if (uvIndex <= 5) {
    return {
      risk: 'Moderate',
      needSunscreen: true,
      message: 'Moderate risk of harm from UV radiation. Apply sunscreen with SPF 15+ if spending time outdoors.',
      spf: 'SPF 15+',
      colorClass: 'moderate'
    };
  } else if (uvIndex <= 7) {
    return {
      risk: 'High',
      needSunscreen: true,
      message: 'High risk of harm from UV radiation. Apply sunscreen with SPF 30+, wear protective clothing and seek shade.',
      spf: 'SPF 30+',
      colorClass: 'high'
    };
  } else if (uvIndex <= 10) {
    return {
      risk: 'Very High',
      needSunscreen: true,
      message: 'Very high risk of harm from UV radiation. Apply SPF 50+ sunscreen, wear protective clothing, limit time outdoors between 10am-4pm.',
      spf: 'SPF 50+',
      colorClass: 'very-high'
    };
  } else {
    return {
      risk: 'Extreme',
      needSunscreen: true,
      message: 'Extreme risk of harm from UV radiation. Avoid being outside during midday hours. Essential to wear protective clothing, sunglasses and SPF 50+ sunscreen.',
      spf: 'SPF 50+ and avoid sun exposure',
      colorClass: 'extreme'
    };
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});