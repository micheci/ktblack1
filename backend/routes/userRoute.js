const express=require('express')
const {getPDF}=require('../controller/pdfController')

const router=express.Router()




router.get('/',getPDF)


module.exports = router