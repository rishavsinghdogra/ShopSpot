// Import necessary modules
import { motion } from "framer-motion";
import HomeNavbar from "./Navbar";
import { Button } from "@/components/ui/button";
import {
  StoreIcon,
  UploadIcon,
  WandIcon,
  FastForwardIcon,
  QrCodeIcon,
  FlagIcon,
  AccessibilityIcon,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  MountainIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Define animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/homepageBackgroung.jpg')",
        backgroundSize: "contain",
        minHeight: "100vh",
      }}
      className="min-h-screen bg-gradient-to-b from-primary to-primary-foreground"
    >
      <motion.header
        className="flex items-center justify-between p-4 border-b bg-white"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-center space-x-4">
          <StoreIcon className="w-8 h-8 animate-bounce" />
          <span className="text-2xl font-bold">ShopSpot</span>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-lg">
            How to use
          </a>
          <a href="#" className="text-lg">
            Log in
          </a>
          <Button variant="outline">Sign up</Button>
        </nav>
      </motion.header>
      <main className="flex flex-col items-center justify-center p-8 space-y-8">
        <motion.div
          className="flex items-center space-x-8"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-4xl font-bold">Find Shops Near you </h1>
            <p className="text-lg">
              Easy and 100%{" "}
              <span className="font-bold text-yellow-500">Free</span>
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => navigate("/login")}
                className="w-full md:w-auto"
              >
                Try it now
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                Learn more
              </Button>
            </div>
          </div>
          <motion.img
            src="./images/homepageCircle.png"
            alt="Person with flowers"
            className="w-[500px] h-64 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.8 } }}
          />
        </motion.div>
        <motion.section
          className="w-full max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 text-center"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            >
              <UploadIcon className="w-12 h-12 mx-auto mb-4 text-primary " />
              <h3 className="text-xl font-bold mb-2">Upload Shop</h3>
              <p className="text-gray-500">
                Simply upload your shop and let our site do the rest.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            >
              <WandIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Set Location</h3>
              <p className="text-gray-500">
                Set location of your shop and let people find you by your
                location
              </p>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          className="w-full max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose ShopSpot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            >
              <FastForwardIcon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Fast and Efficient</h3>
              <p className="text-gray-500">
                Our location based easy to use UI makes it easier for everyone
                to to shop and sell
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2 },
              }}
            >
              <QrCodeIcon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">High-Quality Analytics</h3>
              <p className="text-gray-500">
                Our high quality analytics makes it easier than ever
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.4 },
              }}
            >
              <FlagIcon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">100% Free</h3>
              <p className="text-gray-500">
                We believe in making powerful tools accessible to everyone, so
                our service is completely free to use.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.6 },
              }}
            >
              <AccessibilityIcon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-500">
                Our intuitive interface makes it easy to navigate and make good
                decisions
              </p>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          className="w-full max-w-4xl mt-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2 },
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="./images/Neeraj.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">Neeraj</h3>
                  <p className="text-gray-500">Professional Singer</p>
                </div>
              </div>
              <p className="text-gray-500">
                ShopSpot has transformed my business. More customers, easy to
                use. Highly recommend!
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.4 },
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="./images/Mishika.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">Mishika</h3>
                  <p className="text-gray-500">Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-500">
                Love the ease of use and the analytics. It's helped my business
                grow significantly.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.6 },
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://media.licdn.com/dms/image/D5603AQGeB2dMvgMufQ/profile-displayphoto-shrink_200_200/0/1704125968798?e=2147483647&v=beta&t=8UBFF_RpE7HzrFhhAxp53in76IlJ2hR58g30tIk7Lks"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">Sutirth Verma</h3>
                  <p className="text-gray-500">Rapper</p>
                </div>
              </div>
              <p className="text-gray-500">
                The best platform I've used for my business. It's intuitive and
                extremely effective.
              </p>
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          className="w-full max-w-4xl mt-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-4">
            Have questions? We'd love to hear from you! Follow us on social
            media or send us an email.
          </p>
          <div className="flex items-center space-x-4">
            <motion.a
              href="#"
              className="text-primary"
              whileHover={{ scale: 1.1 }}
            >
              <InstagramIcon className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="#"
              className="text-primary"
              whileHover={{ scale: 1.1 }}
            >
              <TwitterIcon className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="#"
              className="text-primary"
              whileHover={{ scale: 1.1 }}
            >
              <FacebookIcon className="w-8 h-8" />
            </motion.a>
          </div>
        </motion.section>
      </main>
      <motion.footer
        className="p-4 border-t bg-white text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <p className="text-gray-500">© 2023 ShopSpot. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default HomePage;
