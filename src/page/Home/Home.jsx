import React, { useEffect, useState } from 'react'
import HeroSlider from '../../Components/Header/HeroSlider'
import style from '././Home.module.css'
import SlideProducts from '../../Components/SlideProducts/SlideProducts'

const categories = [
"smartphones",
"mobile-accessories",
"laptops",
"tablets",
"sunglasses",
"sports-accessories",
]
export default function Home() {


  const [products, setProducts] = useState({})
   const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await res.json();
            return {[category]: data.products  }
          })
        )

         const productaData = Object.assign({} , ...results);
         setProducts(productaData)


      }catch (error){
          console.log("Erorr Fetching" , error)
      } finally{
        setLoading(false)
      }
      


    }

    fetchProducts()
   
  }, [])

//  console.log(products)


  return <>
  <HeroSlider/>
  
    {loading ? ( 
      <p>Loading....</p>
     ): ( categories.map((category) => (<SlideProducts key={category} data={products[category]}  title={category.replace( "-" , " ")}/>))

     )}
     
  </>
}
