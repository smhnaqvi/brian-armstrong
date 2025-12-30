import Button from "../button";
import FormProvider from "../form"
import TextField from "../input"

const ChangeParameter = () => {
    const handleSubmit = (data: Record<string, unknown>) => {
        console.log('Form submitted:', data);
        // Handle form submission here
    };

    return (
        <FormProvider onSubmit={handleSubmit} defaultValues={{ parameter: '' }}>
            <div className="flex flex-col gap-6">
                <p className="text-white text-sm">Enter your expected annual salary excluding superannuation.</p>
                <TextField 
                    name="parameter" 
                    label="Parameter"
                    placeholder="Enter parameter value"
                />
                <Button>Change Parameter</Button>
           </div>
        </FormProvider>
    );
} 


export default ChangeParameter