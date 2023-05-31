
import {promises as fs} from "fs"


export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products= []
    }

    static id = 0 

    addProduct = async (title, description, price, thumbnail, code, stock) =>{

        this.id++;

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.id,
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }
    
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("No se encuentra el producto")
        } else{
            console.log(respuesta3.find(product => product.id === id));
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        
        console.log("Se ha encontrado el producto")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let oldProduct = await this.readProducts()
        let modifiedProduct = [{ ...producto, id }, ...oldProduct];
        await fs.writeFile(this.patch, JSON.stringify(modifiedProduct));
      
    }

}




/* productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productos.addProduct("producto prueba2", "Este es un producto prueba", 250, "Sin imagen", "abc123", 25); 
productos.addProduct("producto prueba3", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);  
 productos.addProduct("producto prueba4", "Este es un producto prueba", 1000, "Sin imagen", "abc123", 25);  
 productos.addProduct("producto prueba5", "Este es un producto prueba", 2900, "Sin imagen", "abc123", 25);  
 productos.addProduct("producto prueba6", "Este es un producto prueba", 300, "Sin imagen", "abc123", 25);  
 productos.addProduct("producto prueba7", "Este es un producto prueba", 123, "Sin imagen", "abc123", 25);  
 productos.addProduct("producto prueba8", "Este es un producto prueba", 9820, "Sin imagen", "abc123", 25);  
 productos.addProduct("producto prueba9", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);  
 productos.addProduct("producto prueba10", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);  */


