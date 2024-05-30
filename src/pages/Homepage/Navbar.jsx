import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
  } from "@nextui-org/react";
  
  export default function HomeNavbar() {
    return (
      <Navbar className="bg-white shadow-md">
        <NavbarBrand>
          <p className="font-bold text-lg text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link className="text-gray-600 hover:text-gray-900" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link className="text-gray-900 font-semibold" href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-gray-600 hover:text-gray-900" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="/login" radius="large" variant="bordered">
          <Link className="text-gray-600 hover:text-gray-900" href="/login">Login</Link>
            </Button>
            
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/sign-up" radius="large" variant="bordered">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
  