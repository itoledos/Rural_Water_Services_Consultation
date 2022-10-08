const ConsumerController = require('../controllers/consumer.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    
    app.get("/api/consumers/all", authenticate , ConsumerController.getAllConsumers);
    app.get("/api/consumers/:id", authenticate , ConsumerController.getConsumer);
    app.post("/api/consumers/new", authenticate , ConsumerController.createConsumer);
    app.put('/api/consumers/:id', authenticate , ConsumerController.updateConsumer);
    app.delete('/api/consumers/:id', authenticate , ConsumerController.deleteConsumer);

  };