import React from "react"
import PriceItemBox from "../../components/priceItem"
import CalenderTimeline from "../../components/calenderTimeline"
import { LogoText } from "../../components/logo"
import Button from "../../components/button"
import { UploadIcon } from "../../components/icons"


export default function Main() {

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-1">
          <h1 className='text-primary'>Simulator</h1>
          <LogoText />
        </div>
        <div className="flex flex-row items-center gap-[11px] mt-[13px]">
          <Button variant="ghost">
            <UploadIcon />
          </Button>
          <div className="bg-[#1B1B26] rounded-lg p-[11px]" style={{color:"rgba(255, 255, 255, 0.6)"}}>
            <button className="text-sm font-semibold py-2 px-6 cursor-pointer">Cashflows</button>
            <button className="text-sm font-semibold py-2 px-6 cursor-pointer">Charts</button>
            <button className="text-sm font-semibold py-2 px-6 cursor-pointer">Event History</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className={`grid gap-4 transition-all duration-300 flex-1 grid-cols-4`}>
          <PriceItemBox label="cash available" price={80000} />
          <PriceItemBox label="portfolio value" price={1200000} />
          <PriceItemBox label="equity available" price={200000} />
          <PriceItemBox label="debt outstanding" price={800000} />
        </div>
        <div className={`grid gap-4 h-[80vh]`}>
          <CalenderTimeline />
        </div>
      </div>
    </React.Fragment>
  )
}

