const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const validate = (req, res, next) => {
  if (req.query.age) {
    return next()
  }
  return res.redirect('/')
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age < 18) {
    return res.redirect(`/minor?age=${age}`)
  }
  return res.redirect(`/major?age=${age}`)
})

app.get('/minor', validate, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.get('/major', validate, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.listen(3000)
