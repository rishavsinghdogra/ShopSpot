import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { UserDataContext } from "@/contexts/UserDataContext";
import { query, collection, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "../firebase";

const auth = getAuth(app);

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New state variable for loading
  const navigate = useNavigate();
  const {
    setUserIsAuthenticated,
    setStoreEmailInContext,
    setLocation,
    setStoreName,
    setType,
    setUserAccessKey,
    setName,
    setUserEmailInContext,
  } = useContext(UserDataContext);

  function filterSellerData(data, collectionName) {
    return data?.map((seller) => {
      if (collectionName === "seller") {
        const { email, location, storeName, type } =
          seller.doc.data.value.mapValue.fields;
        const accessKey = seller.doc.key.path.segments[6]; // accessKey is always at index 6
        return {
          email: email.stringValue,
          location: location.stringValue,
          storeName: storeName.stringValue,
          type: type.stringValue,
          accessKey: accessKey ? accessKey : "",
        };
      } else {
        const { email, Name, type } = seller.doc.data.value.mapValue.fields;
        const accessKey = seller.doc.key.path.segments[6];
        return {
          email: email.stringValue,
          Name: Name.stringValue,
          type: type.stringValue,
          accessKey: accessKey ? accessKey : "",
        };
      }
    });
  }

  const getUserDataFromCollection = async (collectionName, userEmail) => {
    const collectionRef = collection(firebaseDb, collectionName);
    const q = query(collectionRef, where("email", "==", userEmail));

    const result = await getDocs(q);
    return filterSellerData(
      result?.["_snapshot"]?.docChanges,
      collectionName
    )[0]; //Zero index because result will be one in case of login
  };

  const fetchUserData = async (email) => {
    try {
      const sellerData = await getUserDataFromCollection("seller", email);
      console.log(sellerData);
      if (sellerData) {
        setLocation(sellerData?.location);
        setStoreName(sellerData?.storeName);
        setType(sellerData?.type);
        setStoreEmailInContext(sellerData?.email);
      } else {
        const BuyerData = await getUserDataFromCollection("buyer", email);
        console.log(BuyerData);
        setUserAccessKey(BuyerData?.accessKey);
        setName(BuyerData?.Name);
        setType(BuyerData?.type);
        setUserEmailInContext(BuyerData?.email);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    signInUser(email, password);
  };

  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.email);
        localStorage.setItem(
          "expirationTime",
          userCredential.user.stsTokenManager.expirationTime.toString()
        );

        fetchUserData(userCredential.user.email);
        setLoading(false); // Set loading to false when login is successful
        toast.success("Logged in successfully!");
        setUserIsAuthenticated(true);
        navigate("/dashboard"); // Navigate to home page or desired page on successful login
      })
      .catch((error) => {
        console.error("Error signing in:", error);

        setLoading(false); // Set loading to false when there's an error
        toast.error("Invalid credentials");
      });
  };

  return (
    <motion.div
      className="min-h-lvh flex items-center justify-center bg-gradient-to-r from-[#7882f3] to-[#5555ee]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* <Card className=""> */}
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="••••••••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : "Login"}{" "}
                  {/* Change button text based on loading state */}
                </Button>
              </form>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="underline"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
          <div className=" relative">
            <motion.img
              src="/images/bigLogo.png"
              alt="Image"
              width="120"
              height="680"
              className="h-[70%]  w-[90%] object-contain dark:brightness-[0.2] dark:grayscale"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 100, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogIn;
