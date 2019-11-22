const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Server running!')
})

app.listen(3000)
