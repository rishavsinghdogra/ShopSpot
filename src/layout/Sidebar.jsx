import { Package2, Home, ShoppingCart, Package, Users2, LineChart, Settings } from "lucide-react";

const Sidebar = ({ userType }) => {
    const customerMenuItems = [
        { href: "#", icon: Home, label: "Dashboard" },
        { href: "#", icon: ShoppingCart, label: "Orders" },
        { href: "#", icon: Package, label: "Products" },
        { href: "#", icon: Users2, label: "Customers" },
        { href: "#", icon: LineChart, label: "Analytics" }
    ];

    const sellerMenuItems = [
        { href: "#", icon: Home, label: "Dashboard" },
        { href: "#", icon: Package, label: "Products" },
        { href: "#", icon: Users2, label: "Customers" },
        { href: "#", icon: LineChart, label: "Analytics" }
    ];

    const menuItems = userType === "customer" ? customerMenuItems : sellerMenuItems;

    return ( 
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex bg-white">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <a
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </a>
                
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                    </a>
                ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </a>
            </nav>
        </aside>
    );
}
 
export default Sidebar;
