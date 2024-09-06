const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

 
app.use(express.json());

 
app.use(express.urlencoded({ extended: true }));

 
app.use(express.static('.'));

 
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

 
app.post('/submit', (req, res) => {
  const formData = req.body;
  const filePath = 'form-submissions.txt';
  fs.appendFile(filePath, `${JSON.stringify(formData)}\
`, (err) => {
    if (err) {
      console.error(err);
res.status(500).send('Error submitting form');
    } else {
      res.send('Form submitted successfully!');
    }
  });
});
// 
// One-liner Bootstraping the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});