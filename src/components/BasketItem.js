

 const BasketItem = ({item,Urunler}) => {
  return (
    <>
      <li className="basketItem">
      {Urunler.title }  x <span>{item.amount}</span>   
      </li>
     
     <style jsx>{`
        .basketItem{
          padding:7px;
          font-size:18px;
        }

        .basketItem span{
          color:#999;
        }
     `}
     </style>
    </>
  )
}

export default BasketItem