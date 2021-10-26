const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))  //定義要使用的樣板引擎
app.set('view engine', 'handlebars') //告訴 Express 說要設定的 view engine 是 handlebars

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {

  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })

})

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})
