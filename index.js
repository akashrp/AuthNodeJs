const app= require('./app')
const PORAT= process.env.PORAT
;
app.listen(PORAT,()=>{
    console.log("sever started at port "+PORAT)
})