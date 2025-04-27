require('dotenv').config();
const express = require('express');
const dbConeect = require(`./config/db.config`);
const bodyParser = require('body-parser');
const cors = require('cors');

const expenseRoutes = require('./routes/expense.route')
const userRoutes = require('./routes/user.route')

const app = express();
dbConeect();
// Middleware
app.use(bodyParser.json());
app.use(cors());



// Routes
app.use('/api/exp', expenseRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));