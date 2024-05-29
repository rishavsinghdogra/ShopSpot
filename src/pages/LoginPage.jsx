import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const auth = getAuth(app);

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state variable for loading
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    signInUser(email, password);
  };

  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setError(null);
        setLoading(false); // Set loading to false when login is successful
        toast.success("Logged in successfully!");
        navigate('/'); // Navigate to home page or desired page on successful login
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setError("Invalid credentials");
        setLoading(false); // Set loading to false when there's an error
        toast.error("Error signing in: Invalid credentials");
      });
  };

  return (
    // <AnimatePresence>
      <motion.div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7882f3] to-[#5555ee]"
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
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ">
              <div className="flex items-center justify-center">
                <div className="mx-auto grid w-[350px] gap-6">
                  <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                      Enter your email below to login to your account
                    </p>
                  </div>
                  {/* <AnimatePresence> */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Alert variant="destructive">
                          <ExclamationTriangleIcon className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  {/* </AnimatePresence> */}
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
                    <a href="#" className="underline" onClick={() => navigate('/sign-up')}>
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden bg-muted lg:block">
                <motion.img
                  src="/images/bigLogo.png"
                  alt="Image"
                  width="120"
                  height="680"
                  className="h-[70%] mt-24 w-full object-contain dark:brightness-[0.2] dark:grayscale"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 100, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          {/* </Card> */}
        </motion.div>
      </motion.div>
    // </AnimatePresence>
  );
};

export default LogIn;
