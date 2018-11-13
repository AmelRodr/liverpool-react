import axios from 'axios'

const url = 'https://www.liverpool.com.mx/tienda'

const getProducts = (filter) => {
    return(
        axios.get( url + `/?s=${filter}&d3106047a194921c01969dfdec083925=json` )
        .then( products => {
            return products
        }).catch( error => console.log(error))
    )
}

export default getProducts