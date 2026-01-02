import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { DropdownIcon } from './icons';

type DropdownOption = {
    label: string;
    value: string | number;
};

type DropdownProps = {
    name: string;
    label?: string;
    placeholder?: string;
    options: DropdownOption[];
    defaultValue?: string | number;
}

const Dropdown = ({ name, label, placeholder, options, defaultValue }: DropdownProps) => {
    const { control } = useFormContext<FieldValues>();
    const [isFocused, setIsFocused] = useState(!!defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => {
                const selectedOption = options.find(opt => opt.value === field.value);
                const hasValue = field.value !== undefined && field.value !== null && field.value !== '';
                const isLabelUp = isFocused || isOpen || hasValue;

                return (
                    <div className="relative" ref={dropdownRef}>
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
                            <button
                                type="button"
                                id={name}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    setIsFocused(true);
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => {
                                    if (!isOpen) {
                                        setIsFocused(false);
                                    }
                                }}
                                style={{
                                    border: "1px solid rgba(72, 72, 101, 1)"
                                }}
                                className={`w-full px-3 pt-[22px] pb-2 text-white rounded-xl outline-none transition-colors text-left flex items-center justify-between ${
                                    isOpen ? 'border-primary' : ''
                                }`}
                            >
                                <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
                                    {selectedOption ? selectedOption.label : (isLabelUp ? placeholder : '')}
                                </span>

                                <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                    <DropdownIcon />
                                </div>
                            </button>
                        </div>
                        {isOpen && (
                            <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden" style={{
                                background: "rgba(43, 43, 61, 1)",
                                border: "1px solid rgba(72, 72, 101, 1)",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)"
                            }}>
                                <div className="max-h-60 overflow-y-auto">
                                    {options.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                field.onChange(option.value);
                                                setIsOpen(false);
                                                setIsFocused(false);
                                            }}
                                            className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${
                                                field.value === option.value
                                                    ? 'text-primary bg-primary/10'
                                                    : 'text-white hover:bg-[rgba(72,72,101,0.5)]'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {error && error.message && (
                            <span className="text-red-500 text-xs mt-1 block">{error.message}</span>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default Dropdown;