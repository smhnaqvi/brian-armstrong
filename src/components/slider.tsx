import { useState, useRef, useEffect, useCallback } from 'react';

type SliderProps = {
    min?: number;
    max?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    step?: number;
    showValue?: boolean;
    className?: string;
};

const Slider = ({
    min = 0,
    max = 100,
    value: controlledValue,
    defaultValue,
    onChange,
    step = 1,
    className = ''
}: SliderProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? controlledValue ?? min);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isControlled = controlledValue !== undefined;

    const value = isControlled ? controlledValue : internalValue;

    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = useCallback((e: MouseEvent | React.MouseEvent) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        const newValue = Math.round((min + percentage * (max - min)) / step) * step;
        const clampedValue = Math.max(min, Math.min(max, newValue));

        if (!isControlled) {
            setInternalValue(clampedValue);
        }
        onChange?.(clampedValue);
    }, [isControlled, min, max, step, onChange]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        updateValue(e);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            updateValue(e);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, updateValue]);

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div
                ref={sliderRef}
                className="relative flex-1 h-1 cursor-pointer"
                style={{
                    background: "rgba(72, 72, 101, 1)",
                    borderRadius: "4px"
                }}
                onMouseDown={handleMouseDown}
            >
                <div
                    className="absolute top-0 left-0 h-full transition-all duration-100"
                    style={{
                        width: `${percentage}%`,
                        background: "rgba(72, 72, 101, 1)",
                        borderRadius: "4px"
                    }}
                />
                <div
                    className="absolute text-white flex items-center justify-center px-3 py-1.5 top-1/2 -translate-y-1/2 rounded-full transition-all duration-100 cursor-grab active:cursor-grabbing"
                    style={{
                        width: "90px",
                        height: '46px',
                        left: `calc(${percentage}%)`,
                        background: isDragging ? "#9F7DEF" : "rgba(72, 72, 101, 1)",
                        border: "2px solid rgba(72, 72, 101, 1)",
                        boxShadow: isDragging ? "0 0 0 4px rgba(159, 125, 239, 0.2)" : "none"
                    }}
                >   {value}%</div>
            </div>
        </div>
    );
};

export default Slider;