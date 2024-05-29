import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBzJtwNgzmmJoJ0b9GQdhou6EA7PGjD2s0",
    authDomain: "shopspot-4d1c4.firebaseapp.com",
    projectId: "shopspot-4d1c4",
    storageBucket: "shopspot-4d1c4.appspot.com",
    messagingSenderId: "443691317088",
    appId: "1:443691317088:web:03f772ed5540e5cef8d005",
    measurementId: "G-2JS62KH3P4",
    databaseUrl: "https://shopspot-4d1c4-default-rtdb.firebaseio.com"
  };
//   const analytics = getAnalytics(app);

  export const app = initializeApp(firebaseConfig)