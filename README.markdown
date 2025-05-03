# UV Sunscreen Advisor
### Created By:-
## Biprajit Paul
### LinkedIn : www.linkedin.com/in/biprajitpaul

A web application that uses the OpenUV API to provide users with information about the current UV index at their location and recommend whether they need to apply sunscreen.

## Features
- **Real-time UV Index Data**: Fetches current UV index from the OpenUV API
- **Location-based**: Uses geolocation or manual coordinate input
- **Personalized Recommendations**: Provides sunscreen recommendations based on UV levels
- **Visual Indicators**: Color-coded warnings based on UV level
- **Responsive Design**: Works on both mobile and desktop devices

## Screenshots
## Screenshots
![Home Page](screenshots/home-page.png)  
![Results Page](screenshots/results-page.png)

## Technologies Used
- **Backend**: Node.js with Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Templating**: EJS (Embedded JavaScript)
- **HTTP Client**: Axios
- **API**: OpenUV API for UV index data

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- OpenUV API key (sign up at [OpenUV.io](https://www.openuv.io))

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uv-sunscreen-advisor.git
   cd uv-sunscreen-advisor
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenUV API key:
   ```env
   PORT=3000
   OPENUV_API_KEY=your_api_key_here
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`



## How It Works
1. The application starts by displaying a form where users can enter their latitude and longitude coordinates or use the "Use My Location" button for automatic geolocation.
2. When the form is submitted, the server sends a request to the OpenUV API with the provided coordinates.
3. The API returns data including the current UV index, maximum UV for the day, safe exposure time, and ozone information.
4. Based on the UV index, the application determines if sunscreen is needed and provides specific recommendations:
   - **UV Index 0-2**: Low risk, no sunscreen required for most skin types
   - **UV Index 3-5**: Moderate risk, sunscreen recommended (SPF 15+)
   - **UV Index 6-7**: High risk, sunscreen required (SPF 30+)
   - **UV Index 8-10**: Very high risk, sunscreen essential (SPF 50+), limit time outside
   - **UV Index 11+**: Extreme risk, avoid being outside, use maximum protection
5. The results page displays the current UV index, risk level, sunscreen recommendation, and additional sun protection tips.

## API Endpoints
- **GET /**: Displays the home page with the location input form
- **POST /check-uv**: Processes the form submission, calls the OpenUV API, and displays results



## Acknowledgements
- [OpenUV API](https://www.openuv.io) for providing UV index data
- [Express.js](https://expressjs.com/) for the web application framework
- [EJS](https://ejs.co/) for the templating engine
- [Axios](https://axios-http.com/) for HTTP requests
