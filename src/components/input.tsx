import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import { useState } from 'react';

type TextFieldProps = {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
}

const TextField = ({ name, label, placeholder, type = 'text' }: TextFieldProps) => {
    const { control } = useFormContext<FieldValues>();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const hasValue = field.value && field.value.toString().length > 0;
                const isLabelUp = isFocused || hasValue;

                return (
                    <div className="relative">
                        <div className="relative">
                            {label && (
                                <label
                                    htmlFor={name}
                                    className={`absolute text-primary left-3 transition-all duration-200 pointer-events-none text-[12px] ${
                                        isLabelUp
                                            ? 'top-2 text-xs text-gray-500'
                                            : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                                    }`}
                                >
                                    {label}
                                </label>
                            )}
                            <input
                                {...field}
                                id={name}
                                type={type}
                                placeholder={isLabelUp ? placeholder : ''}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                style={{
                                    border: "1px solid rgba(72, 72, 101, 1)"
                                }}
                                className={`w-full px-3 pt-[22px] pb-2 text-white rounded-xl outline-none transition-colors`}
                            />
                        </div>
                        {error && error.message && (
                            <span className="text-red-500 text-xs mt-1 block">{error.message}</span>
                        )}
                    </div>
                );
            }}
        />
    );
}

export default TextField 