const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const productRoutes = require('./routes/productRoutes');
const discountRoutes = require('./routes/discountRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const allowedOrigins = [
  "https://warehouse.apnimandi.us",
  "https://discount.apnimandi.us"
]

const app = express();
app.use(cors({origin: allowedOrigins}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Warehouse');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
