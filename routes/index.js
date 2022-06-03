var express = require('express');
var router = express.Router();

const controller = require('../controllers/mainController')
const productsController = require('../controllers/productsController')

/* GET home page. */
router.get('/', controller.index);
router.get('/', productsController.index);
router.get('/productDetail/:id/', productsController.productDetail);
router.get('/productCart', controller.productCart);
router.get('/login', controller.login);
router.get('/register', controller.register);
/*** EDIT ONE PRODUCT ***/
router.get('/views/edit/:id/', productsController.edit);
router.post('/productDetail/:id', productsController.update);
module.exports = router;