import React, { useState } from "react"
import PriceItemBox from "../../components/priceItem"
import RightSidebar from "../../components/rightSidebar"
import { PlusIcon } from "../../components/icons"
import CalenderTimeline from "../../components/calenderTimeline"


export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
        
      {!isSidebarOpen && (
        <div className="flex">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-primary hover:bg-primary/80 text-white p-3 rounded-lg shadow-lg transition-all z-10"
            >
            <PlusIcon />
          </button>
        </div>
      )}
      </div>
    <div className={`absolute z-[100] top-0 right-0 h-full transition-all duration-300 ${isSidebarOpen ? 'w-[407px] opacity-100' : 'w-0 opacity-0 overflow-hidden display-none'}`}>
        <RightSidebar onClose={() => setIsSidebarOpen(false)} />
    </div> 
    </React.Fragment>
  )
}

