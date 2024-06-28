import { query, collection, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firebaseDb } from "../firebase";

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
  return filterSellerData(result?.["_snapshot"]?.docChanges, collectionName)[0]; //Zero index because result will be one in case of login
};

export const fetchUserData = async (email) => {
  // function that fetch user data
  try {
    const sellerData = await getUserDataFromCollection("seller", email);
    if (sellerData) {
      return sellerData;
    } else {
      const BuyerData = await getUserDataFromCollection("buyer", email);
      return BuyerData;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const filterStoresData = (data) => {
  return data?.map((seller) => {
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
  });
};

export const fetchStoresData = async (sectorIsSpecified) => {
  //function that fetch stores data
  const storesRef = collection(firebaseDb, "seller");
  let q;
  if (sectorIsSpecified) {
    q = query(storesRef, where("location", "==", sectorIsSpecified));
  } else {
    q = query(storesRef, where("type", "==", "seller"));
  }

  const result = await getDocs(q);
  return filterStoresData(result?.["_snapshot"]?.docChanges);
};

const filterProductsData = (data) => {
  return data?.map((seller) => {
    const { description, imageUrl, product, productPrice } =
      seller.doc.data.value.mapValue.fields;
    const accessKey = seller.doc.key.path.segments[6]; // accessKey is always at index 6
    return {
      description: description.stringValue,
      imageUrl: imageUrl.stringValue,
      productPrice: productPrice.integerValue,
      product: product.stringValue,
      accessKey: accessKey ? accessKey : "",
    };
  });
};
export const fetchProductsData = async (accessKey) => {
  //function that fetch products data
  const productsRef = collection(firebaseDb, `seller/${accessKey}/products`);
  const result = await getDocs(productsRef);
  return filterProductsData(result?.["_snapshot"]?.docChanges);
};

const filterCartData = (data) => {
  return data?.map((buyer) => {
    const { description, imageUrl, product, productPrice, store } =
      buyer.doc.data.value.mapValue.fields;
    const accessKey = buyer.doc.key.path.segments[8]; // accessKey is always at index 6
    return {
      description: description.stringValue,
      imageUrl: imageUrl.stringValue,
      productPrice: productPrice.integerValue,
      product: product.stringValue,
      accessKey: accessKey ? accessKey : "",
      store: store?.stringValue,
    };
  });
};
export const fetchCartData = async (accessKey) => {
  //function that fetch cart data
  const cartRef = collection(firebaseDb, `buyer/${accessKey}/cart`);
  const result = await getDocs(cartRef);
  return filterCartData(result?.["_snapshot"]?.docChanges);
};


export const deleteCartItem = async (accessKey, productId) => {
  const productRef = doc(firebaseDb, `buyer/${accessKey}/cart/${productId}`);
  await deleteDoc(productRef);
};

const filterOrdersData = (data) => {
  return data?.map((seller) => {
    const { description, imageUrl, product, productPrice, buyerEmail, buyerName } =
      seller.doc.data.value.mapValue.fields;
    const accessKey = seller.doc.key.path.segments[8]; // accessKey is always at index 6
    return {
      description: description.stringValue,
      imageUrl: imageUrl.stringValue,
      productPrice: productPrice.integerValue,
      product: product.stringValue,
      accessKey: accessKey ? accessKey : "",
    };
  });
};
export const fetchOrdersData = async (accessKey) => {
  //function that fetch products data
  const productsRef = collection(firebaseDb, `seller/${accessKey}/orders`);
  const result = await getDocs(productsRef);
  return filterOrdersData(result?.["_snapshot"]?.docChanges);
};
