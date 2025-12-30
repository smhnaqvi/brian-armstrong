import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form';
import { ReactNode } from 'react';

type FormProviderProps = {
    children: ReactNode;
    onSubmit?: (data: Record<string, unknown>) => void;
    defaultValues?: Record<string, unknown>;
}

const FormProvider = ({ children, onSubmit, defaultValues }: FormProviderProps) => {
    const methods = useForm({
        defaultValues: defaultValues || {}
    });

    const handleSubmit = (data: Record<string, unknown>) => {
        if (onSubmit) {
            onSubmit(data);
        }
    };

    return (
        <RHFFormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                {children}
            </form>
        </RHFFormProvider>
    );
}

export default FormProvider;