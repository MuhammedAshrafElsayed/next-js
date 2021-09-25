const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const celebrate = require('celebrate').celebrate;
const joi = require('celebrate').Joi;
const Users =  require('./users').Users;
const Auth =  require('./users').Auth;

const signUpValidator = celebrate({body: joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().required()
}).required()});

const signInValidator = celebrate({body: joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
}).required()});


app.use(bodyParser());
app.post('/signUp' ,signUpValidator, (req, res, next) => {
    Users.createUser({name: req.body.name,email: req.body.email, password: req.body.password});
    res.send(201);
});

app.post('/signIn',signInValidator, (req,res,next) => {
    const isValid = Auth.signIn({email: req.body.email, password: req.body.password});
    if (isValid) res.send('welcome');
    else res.send('wrong username or password');
});

app.use((err,req,res,next)=> {
    res.send(err);
});

app.listen(3000,() => {
    console.log(`server started on port:${3000}`)
})