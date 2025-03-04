const express = require('express');
const { addInventory, removeInventory, getAllInventory } = require('../controllers/inventoryController');

const router = express.Router();

router.post('/inventory/add', addInventory);
router.post('/inventory/remove', removeInventory);
router.get('/inventory', getAllInventory);

module.exports = router;