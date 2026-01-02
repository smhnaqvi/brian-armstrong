import { useState, ReactNode } from 'react';

type TabItem = {
    label: string;
    value?: string;
    content?: ReactNode;
};

type TabProps = {
    tabs: TabItem[];
    defaultTab?: number;
    onChange?: (index: number, tab: TabItem) => void;
    showContent?: boolean;
    className?: string;
};

const Tab = ({ 
    tabs, 
    defaultTab = 0, 
    onChange,
    showContent = false,
    className = ''
}: TabProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        onChange?.(index, tabs[index]);
    };

    return (
        <div className={className}>
            <div className="flex rounded-lg p-2" style={{
                background: "linear-gradient(41deg, rgba(42, 42, 60, 0.4) 1.67%, #2F2F41 98.12%)"
            }}>
                {tabs.map((tab, index) => {
                    const isActive = activeTab === index;
                    return (
                        <button
                            key={index}
                            onClick={() => handleTabClick(index)}
                            className={`
                                font-normal text-[14px]
                                relative p-2 transition-all duration-200 w-full
                                ${isActive 
                                    ? 'text-white' 
                                    : 'text-[#9494B3] hover:text-primary'
                                }
                            `}
                        >
                            {isActive && (
                                <span 
                                    className="absolute inset-0 rounded-lg"
                                    style={{
                                        background: "linear-gradient(41deg, rgba(42, 42, 60, 0.4) 1.67%, #7E5AF4 98.12%)",
                                    }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
            {showContent && tabs[activeTab]?.content && (
                <div className="mt-4">
                    {tabs[activeTab].content}
                </div>
            )}
        </div>
    );
};

export default Tab;