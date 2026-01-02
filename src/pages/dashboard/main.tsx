import React, { useState } from "react"
import PriceItemBox from "../../components/priceItem"
import CalenderTimeline from "../../components/calenderTimeline"


export default function Main() {

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <div className={`grid gap-4 transition-all duration-300 flex-1 grid-cols-4`}>
          <PriceItemBox label="cash available" price={80000} />
          <PriceItemBox label="portfolio value" price={1200000} />
          <PriceItemBox label="equity available" price={200000} />
          <PriceItemBox label="debt outstanding" price={800000} />
        </div>
        <div className={`grid gap-4`}>
          <CalenderTimeline />
        </div>
      </div>
    </React.Fragment>
  )
}

