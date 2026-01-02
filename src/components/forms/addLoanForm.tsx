import Button from "../button";
import Dropdown from "../dropdown";
import FormProvider from "../form"
import TextField from "../input"
import Slider from "../slider";
import Tab from "../tab";

const AddLoanForm = () => {
    const handleSubmit = (data: Record<string, unknown>) => {
        console.log('Form submitted:', data);
        // Handle form submission here
    };

    return (
        <FormProvider onSubmit={handleSubmit} defaultValues={{ parameter: '' }}>
            <div className="flex justify-between">
                <p className="text-white text-sm font-semibold">Equity Available</p>
                <p className="text-primary text-[16px] font-normal ">$250,000</p>
            </div>
            <hr className="mt-4 mb-6 border-t border-[#333348]" />
            <div className="flex flex-col gap-4">
                <TextField name="lender" label="Lender" placeholder="Enter lender" />
                <TextField name="loan_balance" label="Initial Loan Balance" placeholder="Enter balance" />
            </div>
            <div className="mt-4 flex gap-2 flex-col">
                <p className="text-white text-[14px] font-normal">Loan Type</p>
                <Tab tabs={[
                    {
                        label: "Principal & Interest", content: <div>
                             <Dropdown name="interest_month" label="Interest Month" placeholder="Select interest month" defaultValue={"1month"}  options={[
                                    { label: "1 month", value: "1month" },
                                    { label: "2 months", value: "2months" },
                                    { label: "3 months", value: "3months" }
                                ]}  />
                    </div> },
                    {
                        label: "Interest Only", content: <div>
                         <Dropdown name="interest_type" label="Interest Type" placeholder="Select interest month" defaultValue={"1month"}  options={[
                                    { label: "1 month", value: "1month" },
                                    { label: "2 months", value: "2months" },
                                    { label: "3 months", value: "3months" }
                                ]}  />
                    </div> },
                ]} showContent={true} />
            </div>
            <div className="mt-4 flex gap-2 flex-col">
                <p className="text-white text-[14px] font-normal">Describe your current interest repayments</p>
                <Tab tabs={[
                    {
                        label: "Variable", content: <div>
                            <Dropdown name="interest_month2" label="Interest Type" placeholder="Select interest month" defaultValue={"1month"}  options={[
                                    { label: "1 month", value: "1month" },
                                    { label: "2 months", value: "2months" },
                                    { label: "3 months", value: "3months" }
                                ]}  />
                        </div>
                    },
                    {
                        label: "Fixed", content: <div className="flex flex-col gap-10">
                            <Dropdown name="interest_year2" label="Interest Type" placeholder="Select interest year" defaultValue={"1year"}
                                options={[
                                    { label: "year", value: "1year" },
                                    { label: "2 years", value: "2years" },
                                    { label: "3 years", value: "3years" }
                                ]} />
                            <Slider min={0} max={100} defaultValue={50}/>
                        </div>
                    },
                ]} showContent={true} />
            </div>
            <hr className="my-6 border-t border-[#333348]" />
            <div className="flex flex-col mt-6">
                <Button>Add Event</Button>
            </div>
        </FormProvider>
    );
} 


export default AddLoanForm