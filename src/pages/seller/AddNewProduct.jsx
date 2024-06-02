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

const AddNewProduct = ({className}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productTitle, setProductTitle] = useState("");
  const [productImage, setProductImage] = useState("");
  const [price, setPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleAddProduct = () => {
    // Validation and submission logic here
    if (!productTitle || !productImage || !price || !productDescription) {
      alert("All fields are required!");
      return;
    }
    // Add product logic here
    console.log({
      productTitle,
      productImage,
      price,
      productDescription,
    });
    // Close the modal after submission
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
          <Button className ="h-11 rounded-md px-8 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90" onPress={onOpen}>Add new product</Button>
        </CardFooter>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="top-center"
        className="bg-slate-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Add New Product
                </h2>
              </ModalHeader>
              <ModalBody className="p-6 space-y-2">
                <Label htmlFor="Product Title">Your Product Title</Label>
                <Input
                  autoFocus
                  type="Product Title"
                  placeholder="Enter product title"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg"
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
                <Label htmlFor="Product Description">Product Description</Label>
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
                  onPress={onClose}
                  className="mr-3 bg-red-500 text-white hover:bg-red-600"
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleAddProduct}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Add Product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewProduct;
