import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.adsim.co/crm/api/v1/refrigerante/listar'
});

export const fetchProducts = async() => {
    const { data } = await api.get()

    return data.map(product => {
        return {
            brand: product.marca,
            sabor: product.sabor,
            formattedName: `${product.sabor} - ${product.quantidade}`,
            value: product.valor,
            id: product.id,
            total: 0
        }
    });
} 