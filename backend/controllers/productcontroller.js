import product from '../model/product.js'

const getProducts = async (req, resp) => {

    try {
        const products = await product.find({})
        resp.json(products)

    }
    catch (error) {
        resp.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, resp) => {

    try {
        const foundProduct = await product.findById(req.params.id)
        if (foundProduct) {
            resp.json(foundProduct)
        }
        else {
            resp.status(404).json({ message: "Product not found" })
        }
    }
    catch (error) {
        resp.status(500).json({ message: error.message })
    }
}

const createProduct = async (req, resp) => {
    const { name, description, price, imageUrl, category, stock } = req.body

    try {
        const newProduct = await product.create({ name, description, price, imageUrl, category, stock })
        resp.status(201).json(newProduct)
    }
    catch (error) {
        resp.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, resp) => {

    const { name, description, price, imageUrl, category, stock } = req.body
    try {
        const foundProduct = await product.findById(req.params.id);
        if (foundProduct) {
            foundProduct.name = name || foundProduct.name;
            foundProduct.description = description || foundProduct.description;
            foundProduct.price = price || foundProduct.price;
            foundProduct.imageUrl = imageUrl || foundProduct.imageUrl;
            foundProduct.category = category || foundProduct.category;
            foundProduct.stock = stock || foundProduct.stock;

            const updatedProduct = await foundProduct.save();
            resp.json(updatedProduct);
        }
        else {
            resp.status(404).json({ message: "Product not found" })
        }

    }
    catch {
        return resp.status(404).json({ message: "Product not found" })
    }
}

const deleteProduct = async (req, resp) => {
    try {
        const foundProduct = await product.findById(req.params.id);
        foundProduct.deleteOne();
    }
    catch (error) {

    }
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }