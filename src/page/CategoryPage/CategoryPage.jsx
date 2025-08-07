import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './CategoryPagemodule.CSS'
import Product from '../../Components/SlideProducts/Product'


export default function CategoryPage() {

    const { category } = useParams()


    const [categoryProducts, setCategoryProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setCategoryProducts(data.products)
            })
            .catch((error) => console.error(error))
            .finally(()=> setLoading(false))
    }, [category])
    return <>

        {/* <div className={styles.category_products}>
            <div className={styles.container}>

                <div className={styles.products}>
                    {categoryProducts.map((item, index) => (
                        <Product item={item} key={index} />
                    ))}
                </div>
            </div>

        </div> */}

{/* <div className={styles.category_products}>
  <div className={styles.container}>
    <div className={styles.products}>
      {categoryProducts.map((item, index) => (
        <Product item={item} key={index} />
      ))}
    </div>
  </div>
</div> */}




{loading ? (
      <div className="text-center py-5">
        <h3>Loading...</h3>
      </div>
    ) : (
      <div className="container py-5" style={{ marginTop: "110px" }}>
        <div className={styles.top_slide}>
          <h2 className="text-primary">
            {category} : {categoryProducts.length}
          </h2>
          <p>Add bestselling products to weekly line up</p>
        </div>
        <div className="row">
          {categoryProducts.map((item, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={index}
            >
              <Product item={item} key={index} />
            </div>
          ))}
        </div>
      </div>
    )}








</>






    
}
