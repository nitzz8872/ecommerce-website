const Product=require('../models/product');
const dotenv=require('dotenv').config({path:'backend/config/config.env'});
const connectDatabase=require('../config/database');

const products=require('../data/products.json')

const {connect}=require('mongoose');


connectDatabase();

const seedProducts= async ()=>{
    try{
        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(products);
        console.log('All productsare added')
        process.exit();

    }catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedProducts();

