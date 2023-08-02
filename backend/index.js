const express = require('express')
const connectToMongo=require('./db1')
var cors = require('cors')

connectToMongo()
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/product',require('./routes/product'))
app.use('/api/orderproduct',require('./routes/orderproduct'))



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})