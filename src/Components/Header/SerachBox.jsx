import React, { useEffect, useState } from 'react'
import style from './header.module.css'
import { FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SerachBox() {

    const [serachTerm, setSerachTerm] = useState("")

    const [suggestions, setSuggestions] = useState([])  //ده لما اكتب حرف في السيرش يظهر المنتج
    const location = useLocation()  // ده لما اعمل سيرش المنيو يختفي

    const navigate = useNavigate()

    const handleSbumit = (e) => {
        e.preventDefault();
        if (serachTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(serachTerm.trim())}`)
        }
        setSuggestions([])

    }

    useEffect(() => {
        const fetchSuggestions = async () => {

            if (!serachTerm.trim()) {
                setSuggestions([])
                return;
            }
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${serachTerm}`)
                const data = await res.json();
                setSuggestions(data.products.slice(0, 10) || [])
            } catch (error) {
                console.error("search Error", error);
                setSuggestions([])
            }
        }

        const debonuce = setTimeout(() => {
            fetchSuggestions()
        }, 300)
        return () => clearTimeout(debonuce)

    }, [serachTerm])

    useEffect (() => {
        setSuggestions([])
    },[location])

    return <>

        <div className={style.serachBox_Contaienr}>

            <form onSubmit={handleSbumit} className={style.search_box}>
                <input type="text" name='search' id='search' placeholder='Search For Products' onChange={(e) => setSerachTerm(e.target.value)} autoComplete="off" />
                <button type='submit'> <FaSearch />  </button>
            </form>

   



            <div className="d-flex justify-content-center position-relative">
                {suggestions.length > 0 && (
                    <ul
                        className="list-group position-absolute z-3"
                        style={{
                            top: "100%",
                            width: "300px", // ✅ العرض
                            maxHeight: "200px", // ✅ أقصى ارتفاع
                            overflowY: "auto",  // ✅ سكرول
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            borderRadius: "8px",
                        }}
                    >
                        {suggestions.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex align-items-center gap-2 py-2 px-3"
                                style={{ cursor: "pointer", fontSize: "14px" }}
                                onClick={() => navigate(`/products/${item.id}`)} >
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>



    </>
}
