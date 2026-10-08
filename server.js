const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/Service');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vehicleServiceDB')
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ==========================================
// OPERATION 1: Display all service records
// GET /api/services
// ==========================================
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve service records',
      error: error.message
    });
  }
});

// ==========================================
// OPERATION 2: Delete a service record by serviceId
// DELETE /api/services/:serviceId
// ==========================================
app.delete('/api/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;

    const deletedService = await Service.findOneAndDelete({ serviceId: serviceId });

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: `No service record found with serviceId: ${serviceId}`
      });
    }

    res.status(200).json({
      success: true,
      message: `Service record ${serviceId} deleted successfully.`,
      data: deletedService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete service record',
      error: error.message
    });
  }
});

// Helper Route: Seed sample data for testing
app.post('/api/services/seed', async (req, res) => {
  try {
    await Service.deleteMany({});
    const sampleData = [
      { serviceId: 'SRV101', vehicleNumber: 'KA-01-AB-1234', customerName: 'John Doe', serviceType: 'Full Service', cost: 250 },
      { serviceId: 'SRV102', vehicleNumber: 'MH-12-CD-5678', customerName: 'Jane Smith', serviceType: 'Oil Change', cost: 80 }
    ];
    const inserted = await Service.insertMany(sampleData);
    res.status(201).json({ success: true, message: 'Sample data seeded', data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));