// index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 7000;





// Serve static files like HTML, CSS, and JS
app.use(express.static(path.join(__dirname, 'frontend')));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


 


