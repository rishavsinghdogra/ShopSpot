import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useContext } from "react";
const Sidebar = ({ userType, selectedComponent, setSelectedComponent }) => {
  const { setUserIsAuthenticated } = useContext(UserDataContext);

  const customerMenuItems = [
    { href: "/home", icon: Home, label: "Products" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
    { href: "/orders", icon: Package, label: "Orders" },
    { href: "/analytics", icon: LineChart, label: "Analytics" },
  ];

  const sellerMenuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/home", icon: Home, label: "Products" },
    { href: "/my-customers", icon: Users2, label: "Customers" },
    { href: "/analytics", icon: LineChart, label: "Analytics" },
  ];

  const menuItems =
    userType === "buyer" ? [...customerMenuItems] : [...sellerMenuItems];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex bg-white">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {menuItems.map((item, index) => {
          return (
            <button
              key={index}
              className={`flex h-9 w-9 items-center justify-center ${
                item.href === selectedComponent ? "bg-black rounded-full" : ""
              } rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
              onClick={() => setSelectedComponent(item.href)}
            >
              <item.icon
                color={item.href === selectedComponent ? "white" : "black"}
                className="h-5 w-5"
              />
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
            </a>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("expirationTime");
                setUserIsAuthenticated(false);
              }}
              className = "text-red-600"
            >
              Log out
              <DropdownMenuShortcut>
                <LogOut color="red"/>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
};

export default Sidebar;
