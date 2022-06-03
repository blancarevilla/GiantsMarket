const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const several = products.filter(product => product.category == 'varios');
const unique = products.filter(product => product.category == 'unico');


const mainController = {
    index: (req, res) => {
        res.render("index", { several, unique })
    },
    productDetail: (req, res) => {
        res.render("productDetail", { several, unique })
    },
    productCart: (req, res) => {
        res.render("productCart", { several, unique })
    },
    login: (req, res) => {
        res.render("login")
    },
    register: (req, res) => {
        res.render("register")
    }
}

module.exports = mainController