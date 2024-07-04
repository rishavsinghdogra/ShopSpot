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
import { Tooltip } from "@nextui-org/react";
import chandigarhSectors from "@/configs/ChandigarhSectors";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { firebaseDb } from "../firebase";

function SelectLocation({ selectedLocation, onSelect }) {
  return (
    <Select value={selectedLocation} onValueChange={onSelect}>
      <SelectTrigger>
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
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  const signUpUser = (
    email,
    password,
    firstName,
    selectedLocation,
    storeName
  ) => {
    setLoading(true); // Set loading to true when the request starts
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        if (isSeller) {
          addDoc(collection(firebaseDb, "seller"), {
            //New seller is added to collection
            storeName: storeName,
            location: selectedLocation,
            email: email.toLowerCase(),
            type: "seller",
          }).then((data) => {
            // seller data is updated with its access key
            const documentKey = data["_key"].path.segments[1];
            const docRef = doc(firebaseDb, "seller", documentKey);
            updateDoc(docRef, {
              accessKey: documentKey,
            });
          });
        } else {
          addDoc(collection(firebaseDb, "buyer"), {
            Name: firstName,
            email: email,
            type: "buyer",
          }).then((data) => {
            const documentKey = data["_key"].path.segments[1];
            const docRef = doc(firebaseDb, "buyer", documentKey);
            updateDoc(docRef, {
              accessKey: documentKey,
            });
          });
        }

        toast.success("Account created successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request finishes
      });
  };

  return (
    <motion.div
    style={{
      backgroundImage: "url('/images/backgroundImagee.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7882f3] to-[#5555ee]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="/images/signUpIllustration.png"
        alt=""
        className=" hidden lg:block"
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
        <Card className="mx-auto mt-10 max-w-sm  bg-blue-500/35 backdrop-blur-2xl shadow-lg rounded-2xl border-none">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <Tooltip
                content="Toggle to register as seller"
                className="relative bottom-3 p-2 rounded-lg bg-slate-300/70 backdrop-blur-sm"
              >
                <Switch
                  isSelected={isSeller}
                  onValueChange={setIsSeller}
                  size="lg"
                  className=" bg-green-400 rounded-full"
                  startContent={<Store color="#FFFFFF" />}
                  endContent={<UserRound color="#FFFFFF" />}
                ></Switch>
              </Tooltip>
            </div>

            <CardDescription className ="text-white">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(e.target);
                const formValues = Object.fromEntries(formData.entries());
                formValues.location = selectedLocation; // Add the selected location to the form values

                const email = formValues.email;
                const password = formValues.password;
                const firstName = formValues["first-name"];
                const location = selectedLocation;
                const storeName = formValues["store-name"];

                signUpUser(email, password, firstName, location, storeName);
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
                      <SelectLocation
                        selectedLocation={selectedLocation}
                        onSelect={setSelectedLocation}
                      />
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create an account"}
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
