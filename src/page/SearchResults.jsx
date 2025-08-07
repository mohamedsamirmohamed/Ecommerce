import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Product from '../Components/SlideProducts/Product';
import styles from '../page/CategoryPage/CategoryPagemodule.CSS'

export default function SearchResults() {
    const [results, setResults] = useState([])
    const [loading , setLoading] =useState(true)
    const query = new URLSearchParams(useLocation().search).get("query");


    useEffect (()=>{
            const fetchResults = async () => {
                try {
                    const res = await fetch (`https://dummyjson.com/products/search?q=${query}`)
                    const data= await res.json();
                    setResults(data.products || [])
                } catch (error){
                    console.error("search Error" , error);
                }
                finally{
                    setLoading(false)
                }
                
            }
            if (query) fetchResults();
    } , [query])
  return <>

{loading ? (
  <div className="text-center py-5">
    <h3>Loading...</h3>
  </div>
) : (
  <div className="container py-5" style={{ marginTop: "110px" }}>
    <div className={styles.top_slide}>
      <h2 className="text-primary">
        Results For: {query} / {results.length}
      </h2>
    </div>

    {results.length === 0 ? (
      <p className="text-danger fs-4 mt-4">
        No results found for "<strong>{query}</strong>".
        Please try a different keyword.
      </p>
    ) : (
      <div className="row">
        {results.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
            <Product item={item} key={index} />
          </div>
        ))}
      </div>
    )}
  </div>
)}



  </>
}
