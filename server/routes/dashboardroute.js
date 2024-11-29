const express = require('express'); 
const router =  express.Router(); 
const dashboardcontroller = require('./../controller/dashboardcontroller') ;
const {isloggingin} = require('./../middleware/checkAuth')
router.get('/dashboard',isloggingin,dashboardcontroller.dashboard)
router.get('/dashboard/item/:id',isloggingin,dashboardcontroller.viewitem)


router.put('/dashboard/item/:id',isloggingin,dashboardcontroller.updateitem)

router.delete('/dashboard/item-delete/:id',isloggingin,dashboardcontroller.deleteItem);

router.get('/dashboard/add',isloggingin,dashboardcontroller.addnote)

router.post('/dashboard/add',isloggingin,dashboardcontroller.addNewNote)

router.get('/dashboard/search',isloggingin,dashboardcontroller.searchitem); 

router.post('/dashboard/search',isloggingin,dashboardcontroller.searchitemsubmit); 

module.exports = router ; 
