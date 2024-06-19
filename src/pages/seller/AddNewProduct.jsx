import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { rashanList } from "@/configs/RashanList";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firebaseDb } from "@/firebase";
import { toast } from "react-toastify";

function SelectProduct({ selectedProduct, onSelect }) {
  return (
    <Select
      selectedKeys={selectedProduct}
      onSelectionChange={onSelect}
      aria-label="."
      placeholder="select product"
      className="w-full bg-white rounded-lg"
      scrollShadowProps={{
        isEnabled: false,
      }}
    >
      {rashanList.map((product) => (
        <SelectItem
          key={product}
          className="bg-white  border border-slate-700 rounded-lg"
        >
          {product}
        </SelectItem>
      ))}
    </Select>
  );
}

const AddNewProduct = ({ className }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productImage, setProductImage] = useState("");
  const [price, setPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(new Set([]));
  const { accessKey } = useContext(UserDataContext);
  console.log(accessKey);

  const handleAddProduct = async () => {
    if (!productImage || !price || !productDescription || !selectedProduct) {
      alert("All fields are required!");
      return;
    }

    await addDoc(collection(firebaseDb, `seller/${accessKey}/products`), {
      //New product is added here in the products collection of the store
      product: [...selectedProduct.values()][0],
      imageUrl: productImage,
      productPrice: Number(price),
      description: productDescription,
    }).then(() => toast.success("Product Added Successfully"));
    onOpenChange(false);
    setProductImage("");
    setPrice("");
    setProductDescription("");
    setSelectedProduct(new Set([]));
  };

  const handleClose = () => {
    setProductImage("");
    setPrice("");
    setProductDescription("");
    setSelectedProduct(new Set([]));

    onOpenChange(false);
  };

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle>Add a new product</CardTitle>
          <CardDescription className="max-w-lg leading-relaxed">
            Add new products simply by clicking the button below, our seamless
            process makes it easier than ever
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="h-11 rounded-md px-8 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
            onPress={onOpen}
          >
            Add new product
          </Button>
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="top-center"
        className="bg-slate-300/90 backdrop-blur-sm rounded-xl"
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Add New Product
                  </h2>
                </ModalHeader>
                <ModalBody className="p-6 space-y-2">
                  <Label htmlFor="Product Title">Select product to add</Label>
                  <SelectProduct
                    type="Product Title"
                    selectedProduct={selectedProduct}
                    onSelect={setSelectedProduct}
                  />
                  <Label htmlFor="Product Image URL">Product Image URL</Label>
                  <Input
                    type="Product Image URL"
                    placeholder="Enter image URL"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    className="border border-gray-300 rounded-lg"
                  />
                  <Label htmlFor="Price">Price</Label>
                  <Input
                    label="Price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border border-gray-300 rounded-lg"
                  />
                  <Label htmlFor="Product Description">
                    Product Description
                  </Label>
                  <Textarea
                    type="Product Description"
                    placeholder="Enter product description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="border border-gray-300 rounded-lg"
                  />
                </ModalBody>
                <ModalFooter className="border-t border-gray-200 pt-4">
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      handleClose();
                      onClose();
                    }}
                    className="mr-3 bg-red-500 rounded-lg text-white hover:bg-red-600"
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleAddProduct}
                    className="bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Product
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewProduct;
