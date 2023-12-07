const express = require('express');
const app = express();
const port = 3002;
const pdfRoutes = require('./routes/pdfRoute'); 
const userRoutes = require('./routes/userRoute'); 

const cors = require('cors');

app.use(cors());


app.use('/',pdfRoutes)
app.use('/user',userRoutes)


app.listen(port,()=>{
    console.log(`server is running on port!s ${port}`)
})