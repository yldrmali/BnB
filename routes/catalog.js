var express = require('express');
var router = express.Router();

var home_controller=require('../controller/homeController')




/* GET home page. */

router.get('/',home_controller.index)

//create
router.get('/home/create',home_controller.home_create_get)
router.post('/home/create',home_controller.home_create_post)

//delete and update
router.get('/home/delete_update',home_controller.home_delete_update_get)

//delete
router.get('/home/delete/:id',home_controller.home_delete_get)

//update
router.get('/home/update/:id',home_controller.home_update_get)
router.post('/home/update/:id',home_controller.home_update_post)



module.exports = router;
