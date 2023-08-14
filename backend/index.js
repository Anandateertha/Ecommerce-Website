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

app.use('/api/payment',require('./routes/payment'))



app.listen(port, () => {
    console.log(`Hemadri's is live on port http://localhost:${port}`)
})
