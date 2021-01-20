import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

const ProductStorage = createContext()

export function Storage({children}) {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(()=> {
        fetchProducts().then(data => {
            setProducts(data)
        })
    }, [])

    return( 
        <ProductStorage.Provider value={{
            products,setProducts, total,setTotal
        }}>
            {children}
        </ProductStorage.Provider>
    )
}

export function useProducts() {
    const global = useContext(ProductStorage)
    return global
}