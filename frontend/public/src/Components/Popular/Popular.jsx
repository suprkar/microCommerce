import React, { useEffect, useState } from 'react'
import './Popular.css'

import Item from '../Item/Item'
const Popular = () => {

  const [shoes,setShoes] = useState([]);

  useEffect(()=> {
    fetch('http://localhost:4000/popularinshoe').then((res) => res.json()).then((data)=>setShoes(data))
  },[])


  return (
    <div className='popular'>
        <h1>POPULAR IN SHOES</h1>
        <hr />
        <div className="popular-item">
            {shoes.map((item,i)=> {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular
