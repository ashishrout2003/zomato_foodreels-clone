const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/auth.routes')
const foodRoutes = require('./Routes/food.routes');
const foodPartnerRoutes = require('./Routes/food-partner.routes')
const cors = require('cors');

const app = express();

// In development reflect the request origin so both localhost and 127.0.0.1 work
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res)=>{
    res.send('hello ashish')
})

app.use('/api/auth', authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes)


module.exports = app;