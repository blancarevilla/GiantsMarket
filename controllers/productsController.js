const fs = require('fs');
const path = require('path');


const productsFilePath = (path.join(__dirname, '../data/products.json'));
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8'); //Esta función solo escribe en el JSON

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    index: (req, res) => {
        res.render('products', {
            products,
            toThousand
        })
    },

    productDetail: (req, res) => {
        let productId = +req.params.id;
        let product = products.find(product => product.id === productId)

        res.render('productDetail', {
            product,
            toThousand
        })
    },
    productCart: (req, res) => {
        res.render("productCart")
    },

    create: (req, res) => { //Solo necesitamos pasarle la vista renderizada para que la rellene, es por get
        res.render('createProduct')
    },

    store: (req, res) => {

        let lastId = 1;

        products.forEach(product => {
            if (product.id > lastId) {
                lastId = product.id
            }
        });

        let newProduct = {
            ...req.body,
            id: lastId + 1,
            image: req.file ? req.file.filename : "default-image.png"
                // mejorar 
        }

        products.push(newProduct)

        writeJson(products)
        res.redirect('/')
    },
    edit: (req, res) => {
        let id = +req.params.id;
		let product = products.find(product => product.id === id);

		res.render("editProduct", {product})
	},


    update: (req, res) => {
     let id = +req.params.id
        let productToEdit = products.find(product => product.id === id)
        //console.log('Got body:', req);
        //console.log('Get Id:', id);
        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            image: productToEdit.image
        };

        let productEdited = products.map(product => {
            if (product.id === productToEdit.id) {
                return product = {...productToEdit};
            }
            return product
            
        })
        

        //fs.writeFileSync(productsFilePath, JSON.stringify(productEdited));
        writeJson(productEdited)
        console.log(productEdited);
        res.redirect('/productDetail/'+ id)
    },
   
    destroy: (req, res) => {
        let productId = +req.params.id;

        products.forEach(product => {
            if (product.id === productId) {

                if (fs.existsSync("./public/images/products/", product.image)) {
                    fs.unlinkSync(`./public/images/products/${product.image}`)
                } else {
                    console.log("No se encontró el producto")
                }

                let productToDestroyIndex = products.indexOf(product)
                if (productToDestroyIndex !== -1) {
                    products.splice(productToDestroyIndex, 1)
                } else {
                    console.log('No se encontró el producto')
                }
            }
        })
        writeJson(products)
        res.redirect('/');
    },


    /*login: (req, res) => {
        res.render("login")
    },
    register: (req, res) => {
        res.render("register")
    }*/
}

module.exports = productsController