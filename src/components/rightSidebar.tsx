import { useState } from "react"
import changeParameterForm from "./forms/changeParameterForm"
import AddLoanForm from "./forms/addLoanForm"
import {
  OneOffExpenseIcon,
  PartialRentalIcon,
  MoveHouseIcon,
  AddLoanIcon,
  RefinanceIcon,
  AdjustLoanTermsIcon,
  ConstructionLoanIcon,
  CashImprovementsIcon,
  GrannyFlatIcon,
  AppraisalIcon,
  SellIcon,
  BonusCommissionIcon,
  WalletIcon,
  CapitalGainLossIcon,
  PersonalLoanIcon,
  CarLoanIcon,
  OffsetLoansIcon,
  InfoIcon,
  CloseIcon
} from "./icons"

type RightSidebarProps = {
  onClose: () => void
}

type EventButtonProps = {
  icon: () => JSX.Element
  label: string
  onClick?: () => void
}

type TEvent = {
  icon: () => JSX.Element
  label: string
  component?: () => JSX.Element
}

const EventButton = ({ icon: Icon, label, onClick }: EventButtonProps) => {
  return (
    <button onClick={onClick} className="transition-all group cursor-pointer">
    <div className="flex flex-col items-center gap-2 h-[56px] justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50  text-gray-300 group-hover:text-primary transition-colors">
        <Icon />
    </div>
      <span className="text-[10px] text-gray-300 group-hover:text-white text-center leading-tight">
        {label}
      </span>
    </button>
  )
}

  const propertyEvents = [
    { icon: OneOffExpenseIcon, label: "One-Off Expense" },
    { icon: PartialRentalIcon, label: "Partial Rental" },
    { icon: MoveHouseIcon, label: "Move House" },
    { icon: AddLoanIcon, label: "Add Loan", component: AddLoanForm },
    { icon: RefinanceIcon, label: "Refinance", component: changeParameterForm },
    { icon: AdjustLoanTermsIcon, label: "Adjust Loan Terms" },
    { icon: ConstructionLoanIcon, label: "Construction Loan" },
    { icon: CashImprovementsIcon, label: "Cash Improvements" },
    { icon: GrannyFlatIcon, label: "Granny Flat" },
    { icon: AppraisalIcon, label: "Appraisal" },
    { icon: SellIcon, label: "Sell" },
  ]

  const personalEvents = [
    { icon: BonusCommissionIcon, label: "Bonus/Commission" },
    { icon: WalletIcon, label: "One-Off Expense" },
    { icon: CapitalGainLossIcon, label: "Capital Gain / Loss" },
    { icon: PersonalLoanIcon, label: "Personal Loan" },
    { icon: CarLoanIcon, label: "Car Loan" },
    { icon: OffsetLoansIcon, label: "Offset Loans" },
  ]

const RightSidebar = ({ onClose }: RightSidebarProps) => {

    const [activeEvent, setActiveEvent] = useState<TEvent | null>(null)
    
    const handleSelectEvent = (event: TEvent) => {
        if (event.component) {
            setActiveEvent(event)
        }
    }

    const handleClose = () => {
        setActiveEvent(null)
        onClose()
    }

  return (
    <div className="right-sidebar h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-semibold">{activeEvent ? activeEvent.label : "Add Event"}</h2>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      {activeEvent && activeEvent.component ? (
        <activeEvent.component />
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Property Events Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-2 mb-4">
                      <h3 className="text-primary text-sm font-medium">Property Events</h3>
                      <button className="text-gray-400 hover:text-gray-300 cursor-pointer">
                          <InfoIcon />
                      </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                      {propertyEvents.map((event: TEvent, index: number) => (
                          <EventButton key={index} icon={event.icon} label={event.label} onClick={() => handleSelectEvent(event)} />
                      ))}
                  </div>
              </div>

              {/* Personal Events Section */}
              <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                      <h3 className="text-primary text-sm font-medium">Personal Events</h3>
                      <button className="text-gray-400 hover:text-gray-300 cursor-pointer">
                          <InfoIcon />
                      </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                      {personalEvents.map((event, index) => (
                          <EventButton
                              key={index}
                              icon={event.icon}
                              label={event.label}
                              onClick={() => console.log(event.label)}
                          />
                      ))}
                  </div>
                </div>
              </div>)}
    </div>
  )
}

export default RightSidebar