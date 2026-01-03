import {UsersIcon, GridIcon, NotificationIcon, FileSharingIcon, DollarIcon, GiftIcon, UserPlusIcon} from "./icons"
import Logo from "./logo"
import NavigationList from "./navigationList"


const navigationItems = [
  { id: "1", to: '/', label: 'Home', icon: GridIcon },
  { id: "2", to: '/dashboard', label: 'Dashboard', icon: UsersIcon },
  { id: "3", to: '/dashboard', label: 'Dashboard', icon: NotificationIcon },
  { id: "4", to: '/dashboard', label: 'Dashboard', icon: FileSharingIcon },
  { id: "5", to: '/dashboard', label: 'Dashboard', icon: DollarIcon },
]

const buttomNavigationItems = [
  { id: "1", to: '/', label: 'Home', icon: GiftIcon },
  { id: "2", to: '/dashboard', label: 'Dashboard', icon: UserPlusIcon },
]

const Sidebar = () => {
  const avatar = "/images/avatar.svg"
  return (
    <div className="fixed left-0 top-0 h-screen flex flex-col justify-between bg-[#1B1B26] border border-white/10 w-[70px] p-[11px] overflow-hidden z-50">
      <div className="flex flex-col gap-8">
        <Logo />
        <NavigationList items={navigationItems} />
      </div>
      <div className="flex flex-col gap-4 items-center mb-3">
        <NavigationList items={buttomNavigationItems} />
        <img src={avatar} alt="avatar" className="w-10 h-10" />
      </div>
    </div>
  )
}

export default Sidebar