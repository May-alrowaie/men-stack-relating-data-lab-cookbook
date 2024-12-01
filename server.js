const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const ingredient = require('./models/ingredients');
const recipe = require('./models/recipe');
const user = require('./models/userModel');



const mongoDBconnection = require('./config/mongoDBconnection');


const ejs = require('ejs');
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const morgan = require('morgan');
app.use(morgan('dev'));

 
app.get('/',(req,res)=>{
    res.render('index', {user: req.session.user,})
});

// auth
const authRoutes = require('./routes/authRoutes');
app.use(passUserToView);
app.use('/', authRoutes);
app.use(isSignedIn);

// Recipesush(object.name);
    
    const choiceIngredients = await ingredient.find();
    const id = view.owner;
    res.render('recipes/recipeUpdate',{view, id, array, choiceIngredients});


app.put('/recipes/:recipeId',async (req,res)=>{
    const ingredients = await ingredient.find();
    const recipeId = req.params.recipeId.slice(1); 
    const ingredientArray = Array.isArray(req.body.newingredients) ? req.body.newingredients : [req.body.newingredients];
    console.log(ingredientArray);
    const update


app.get('/:id/recipes',async (req,res)=>{
 let id = req.params.id
 let recipeCreated = false
 const recipes = await recipe.find({owner: id});
 res.render('recipes/recipesIndex',{id, recipes, recipeCreated});
})


app.get('/:id/recipes/new',async (req,res)=>{
    const ingredients = await ingredient.find();
    let id = req.params.id
    res.render('recipes/createRecipe',{id, ingredients})
})


app.post('/recipes', async (req, res) => {
    let id = req.body.owner
    const existingRecipe = await recipe.findOne({ name: req.body.name });
    if (!existingRecipe) {
        const ingredientArray = Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients];
        console.log(ingredientArray)
        await recipe.create({
            name : req.body.name,
            instructions : req.body.instructions,
            owner: req.body.owner,
            ingredients: ingredientArray 
        });
    }

    const recipes = await recipe.find({ owner : id });
    res.render('recipes/recipesIndex', { id, recipes, recipeCreated: true });
});


app.get('/:id/recipes/:recipeId',async (req,res)=>{
    const view = await recipe.findOne({_id: req.params.recipeId});
    const ingredients = view.ingredients;
    const array = []
    for(element of ingredients){
        let object = await ingredient.findById(element);
        array.push(object.name);
    }
    const id = req.params.id;
    res.render('recipes/recipesView',{view, id, array});
})


app.get('/recipes/:recipeId/edit',async (req,res)=>{
    const view = await recipe.findOne({_id: req.params.recipeId});
    const ingredients = view.ingredients;
    const array = []
    for(element of ingredients){
        let object = await ingredient.findById(element);
        array.pdRecipe = await recipe.findByIdAndUpdate(recipeId,{
        name : req.body.newname,
        instructions : req.body.newinstructions,
        ingredients : ingredientArray,
    });
    await updatedRecipe.save();
    let id = updatedRecipe.owner;
    let recipeCreated = false;
    const recipes = await recipe.find({owner: id});
    res.render('recipes/recipesIndex',{id, recipes, recipeCreated, ingredients});
})


app.delete('/recipes/:recipeId',async (req,res)=>{
    const result = await recipe.findByIdAndDelete(req.params.recipeId);
    const id = result.owner;
    let recipeCreated = false;
    if (result) {
        const recipes = await recipe.find({owner: id});
        res.render('recipes/recipesIndex',{id, recipes, recipeCreated});
    } else {
      res.status(404).send('Recipe not found');
    }
})




app.get('/ingredients',async (req,res)=>{
    const ingredients = await ingredient.find();
    res.render('ingredients/ingredientsIndex',{ingredients} );
})


app.get('/ingredients/new',(req,res)=>{
    res.render('ingredients/createIngredient');
})


app.post('/ingredients',async (req,res)=>{
    const ingredientName = req.body.ingredient.trim().toUpperCase();
    const existingIngredient = await ingredient.findOne({ name: ingredientName });
    if(!existingIngredient){
        await ingredient.create({
            name: ingredientName
        });
    }
    res.redirect('/ingredients');
})



PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(`Listening on port ${PORT}`));