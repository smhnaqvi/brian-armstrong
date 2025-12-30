import { Link } from "react-router-dom"

const NavigationList = ({ items }: { items: { id: string, to: string, label: string, icon: () => JSX.Element }[] }) => {
    return (
        <nav>
            <ul className="flex flex-col gap-6 items-center">
                {items.map((item) => (
                    <li className="nav-item w-5 h-5" key={item.id}>
                        <Link className="nav-link" to={item.to}>
                            <item.icon />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavigationList;