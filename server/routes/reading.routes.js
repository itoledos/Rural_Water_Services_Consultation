const ReadingController = require('../controllers/reading.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    
    app.get("/api/readings/all", authenticate , ReadingController.getAllReadings);
    app.get("/api/readings/:id", authenticate , ReadingController.getReading);
    app.post("/api/readings/new", authenticate , ReadingController.createReading);
    app.put('/api/readings/:id', authenticate , ReadingController.updateReading);
    app.delete('/api/readings/:id', authenticate , ReadingController.deleteReading);

  };