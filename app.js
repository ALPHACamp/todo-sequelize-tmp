const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const session = require('express-session')
const passport = require('passport')

app.use(session({
  secret: 'your secret key',
  resave: 'false',
  saveUninitialized: 'false'
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// 設定路由
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/users', require('./routes/user'))

app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})
