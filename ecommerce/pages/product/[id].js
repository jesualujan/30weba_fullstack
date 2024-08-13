// Nombrar un archivo Javascript con el siguiente formato [id].js 
// es una convención de nomenclatura que generalmente se utiliza para identificar 
// de manera única un archivo en un proyecto 
// Aquí hay una razon por la que se podría adoptar esta convención:
// 1.- Identificación única:
// El uso de un identificador único como lo es el id en el nombre del archivo ayuda a garantizar
// que no haya conflictos con otros archivos en el mismo directorio o proyecto.
import React from 'react'
import {useRouter} from 'next/router'
import {data} from '../../utils/data'

const ProductPage = () => {
    const router = useRouter() // es un hook de next 
    const {id} = router.query

    const product = data.products.find((product) => product.id === parseInt(id))

    if(!product) {
        return <div> 404 | Product not Found </div>
    }

  return (
    <div>
        {`Product: id - ${id}`}
    </div>
  )
}

export default ProductPage