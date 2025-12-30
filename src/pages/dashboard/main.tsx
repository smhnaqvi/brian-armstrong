import PriceItemBox from "../../components/priceItem";

export default function Main() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <PriceItemBox label="cash available" price={80000} />
        <PriceItemBox label="portfolio value" price={1200000} />
        <PriceItemBox label="equity available" price={200000} />
        <PriceItemBox label="debt outstanding" price={800000} />
      </div>
    </div>
  )
}