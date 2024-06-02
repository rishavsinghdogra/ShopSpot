import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Switch } from "@nextui-org/react";
import { Store, UserRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import chandigarhSectors from "@/configs/ChandigarhSectors";

function SelectLocation() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a sector" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chandigarh Sectors</SelectLabel>
          {chandigarhSectors.map((sector, index) => (
            <SelectItem key={index} value={sector}>
              {sector}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const auth = getAuth(app);

const SignUP = () => {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  console.log(isSeller);

  const signUpUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success("Account created successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        toast.error(error.message);
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7882f3] to-[#5555ee]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="/images/signUpIllustration.png"
        alt=""
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: -100, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mx-auto mt-10 max-w-sm bg-white shadow-md rounded-lg">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <Switch
                isSelected={isSeller}
                onValueChange={setIsSeller}
                size="lg"
                className=" bg-green-400 rounded-full"
                startContent={<Store color="#FFFFFF" />}
                endContent={<UserRound color="#FFFFFF" />}
              ></Switch>
            </div>

            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                signUpUser(email, password);
              }}
            >
              <div className="grid gap-4">
                {isSeller ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid  gap-2">
                      <Label htmlFor="store-name">Store Name</Label>
                      <Input
                        id="store-name"
                        name="store-name"
                        placeholder="Your store name"
                        required
                      />
                    </div>
                    <div>
                    <Label htmlFor="location">Location</Label>
                    <SelectLocation />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input
                        id="first-name"
                        name="first-name"
                        placeholder="Max"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input
                        id="last-name"
                        name="last-name"
                        placeholder="Robinson"
                        required
                      />
                    </div>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  className="underline"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SignUP;
