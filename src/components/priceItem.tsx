type PriceItemProps = {
    label: string
    price: number
}

const PriceItemBox = ({ label, price} : PriceItemProps) => {
  const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  
  return (
    <div className=" flex flex-col gap-1 price-item-box py-[11px] px-[15px] rounded-lg">
        <h3 className="text-primary text-sm uppercase">{label}</h3>
        <p className="text-[#F0F0F4] text-[28px]">${formattedPrice}</p>
    </div>
  )
}

export default PriceItemBox