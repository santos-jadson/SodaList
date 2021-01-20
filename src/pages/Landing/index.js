import React, { useRef, useState } from 'react';

import './styles.css'

import { useProducts } from '../../context/Context';

function Landing() {
    const { products, total, setTotal } = useProducts()
    const row = useRef([])
    const [counter, setCounter] = useState(1)

    let id = 1;

    function handleChange(element,id) {
        switch(element.target.type){
            //checa se a interação do usuario com a tabela é trocando de produto
            case 'select-one':
                handleSelectChange(element)
                setBrand(element)
                break
            //checa se a interação do usuario com a tabela é aumentando a qtd do produto no input
            case 'number':
                handleQuantityProductsChange(element)
                break;
            default:
                break;
        }
    }

    function handleSelectChange(element) {
        let productIndex, refIndex
        //Procura o indice do produto no array da api
        products.map((product, index) => {
            if(product.formattedName === element.target.value) productIndex = index

            return index
        })
        //Procura o indice do produto na dom do html
        refIndex = row.current.findIndex(r => r !== null && r.id === element.currentTarget.id)

        const pastValue = row.current[refIndex].cells[4].innerHTML

        //Valor do produto
        row
            .current[refIndex]
            .cells[3]
            .innerHTML = products[productIndex].value
        
        let finalProductPrice = products[productIndex].value * row.current[refIndex].cells[2].firstChild.value

        //Valor do produto * qtd    
        row
            .current[refIndex]
            .cells[4]
            .innerHTML = finalProductPrice

        finalProductPrice > 0 && setTotal((total) => total + (finalProductPrice - pastValue))
    }

    function handleQuantityProductsChange(element) {
        let productIndex, refIndex

        if(element
            .currentTarget
            .firstChild
            .firstElementChild
            .firstChild
            .value === 'select'
        ) return

        let totalPrice = 0
        const productName = element
            .currentTarget
            .cells[0]
            .firstChild
            .children[0]
            .value

        //Procura o indice do produto no array da api
        products.map((product, index) => {
            if(product.formattedName === productName) productIndex = index

            return index
        })

        //Procura o indice do produto na dom do html
        refIndex = row.current.findIndex(r => r !== null && r.id === element.currentTarget.id)
        
        const pastValue = row.current[refIndex].cells[4].innerHTML

        totalPrice = products[productIndex].value * row.current[refIndex].cells[2].firstChild.value
        row.current[refIndex].cells[4].innerHTML = totalPrice

        setTotal((total) => total + (totalPrice - pastValue))
    }

    function setBrand(element) {
        let productIndex, refIndex
        //Procura o indice do produto no array da api
        products.map((product, index) => {
            if(product.formattedName === element.target.value) productIndex = index

            return index
        })  
        //Procura o indice do produto na dom do html
        refIndex = row.current.findIndex(r => r !== null && r.id === element.currentTarget.id)

        row
            .current[refIndex]
            .cells[1]
            .innerHTML = products[productIndex].brand
    }

    let rows = []

    for(let i=0; i < counter; i++){
        rows.push(
            <tr 
            key={i}
            ref={ref => !row.current.includes(ref) && row.current.push(ref)}
            id={id++}
            // eslint-disable-next-line no-loop-func
            onChange={(e) => {handleChange(e, id)}}
            >
                <td>
                    <div className="select-options">
                        <select
                        defaultValue="select"
                        >
                            <option value="select" disabled>Escolha uma opção</option>
                            {products.map(product => 
                                <option value={product.formattedName} key={product.id} >{product.formattedName}</option>
                            )}
                        </select>
                    </div>
                </td>
                <td></td>
                <td><input type="number" defaultValue={0} min="0"/></td>
                <td>0</td>
                <td>0</td>
            </tr>
        )
    }

  return (
        <section className="list">
            <table id="products">
                <thead>
                    <tr className="title">
                        <th>Produto</th>
                        <th>Marca</th>
                        <th style={{width:"100px"}}>Quantidade</th>
                        <th>Valor(und)</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id='products-body'>
                    {rows}
                </tbody>
            </table>

            <div className="total">
                <span>Total: <strong>{`${total}`}</strong></span>
                <button type="button" className="add" onClick={() => setCounter(counter+1)}>Add Linha</button>
            </div>
        </section>
  );
}


export default Landing;