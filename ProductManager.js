import { promises as fs } from 'fs';


class ProductManager {
  constructor() {
    this.patch = './productos.txt';
    this.products = [];
  }
  static id = 0

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    
    ProductManager.id++;

    let newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: ProductManager.id
        
    }

    this.products.push(newProduct);

   //JSON.stringify para pasar newProduct a string
    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
     //JSON.parse para pasar a objeto
    return JSON.parse(respuesta);
  }

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  }

    getProductsById = async (id) => {
    
        let respuesta3 = await this.readProducts();
      if(!respuesta3.find(product => product.id === id)) {
        console.log("No se encuentran los productos")
      } else {
        console.log(respuesta3.find(product => product.id === id))
      }

       
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(this.productFilter));
        console.log("Producto eliminado");
    };

}

const productos = new ProductManager



/* productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productos.addProduct("producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25); 
productos.addProduct("producto prueba3", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);   */

//productos.getProducts();

//productos.getProductsById(1);

productos.deleteProductsById(1);