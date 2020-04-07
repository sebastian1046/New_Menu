const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Recipe = require('./modelos/recipes')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/createRecipe', async (req, res) =>{
    
    if (!req.body.title) {
        res.status(200)
        res.send('No incluiste un titulo, para tu receta')
        return
    }
    
    const recipeFound = await Recipe.findOne({ title: req.body.title})

    if (recipeFound) {
        res.status(200)
        res.send(`No se puede crear la receta ${req.body.title} debido a que ya existe`)
        return
    }

    const newRecipe = new Recipe(req.body)

    const response = await newRecipe.save().catch(error => {
        res.status(500)
        res.send(error)
    })
    if (response) {
        res.send(`Se creo la receta llamada ${req.body.title}`)
    }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
