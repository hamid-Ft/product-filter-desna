import {
  Chip,
  Tab,
  Tabs,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useStore } from "@/stores/productsStore";
import Image from "next/image";
import React, { useCallback } from "react";
const Products: React.FC = () => {
  const { products, selectedCategories, selectedFilters } = useStore();
  const [openModal, setOpenModal] = React.useState<string | null>(null);
  const [prevUrl, setPrevUrl] = React.useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const [currentSlide, setCurrentSlide] = React.useState("details");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleNext = (productName: string) => {
    setCurrentSlide(currentSlide === "details" ? "options" : "details");
    router.replace(
      pathname +
        "?" +
        createQueryString(
          productName.replace(" ", "-"),
          currentSlide === "details" ? "options" : "details"
        )
    );
  };

  const handlePrev = (productName: string) => {
    setCurrentSlide(currentSlide === "details" ? "options" : "details");
    router.replace(
      pathname +
        "?" +
        createQueryString(
          productName.replace(" ", "-"),
          currentSlide === "details" ? "options" : "details"
        )
    );
  };
  const handleOpenModal = (productName: string) => {
    setPrevUrl(window.location.href);
    setTimeout(() => {
      router.push(
        pathname +
          "?" +
          createQueryString(productName.replace(" ", "-"), "details")
      );
      setOpenModal(productName);
    }, 10);
  };

  const handleCloseModal = () => {
    if (prevUrl) {
      window.history.replaceState({}, "", prevUrl);
    }
    setOpenModal(null);
  };
  const filteredByCategory =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.includes(product.CategoryID)
        )
      : products;

  const filteredProducts =
    selectedFilters.length > 0
      ? filteredByCategory.filter((product) =>
          selectedFilters.some((sf) =>
            product.Filters.some(
              (f) => sf.filter === f.Filter && sf.option === f.Option
            )
          )
        )
      : filteredByCategory;

  return (
    <div className="flex flex-col h-full w-full justify-start">
      <h1 className="text-3xl font-extrabold border-b-4 border-black py-2  w-full text-center ">
        Products
      </h1>
      <div className="flex mt-2 justify-start items-center">
        {filteredProducts.map((product) => (
          <div
            key={product.ProductName}
            className="flex flex-col items-center h-full justify-start ml-1 border-2 border-black  rounded-xl bg-slate-200">
            <h3 className="text-lg font-bold w-full border-b-2 mb-1 border-black text-center">
              {product.ProductName}
            </h3>
            <Image
              src={product.Image}
              alt={`product-${product.ProductName} thumbnail`}
              width={200}
              height={200}
              className="object-contain aspect-square border-2 border-black m-3 rounded-xl"
            />
            <p className="font-bold">{product.Price}$</p>
            <p className="font-semibold">{product.Stock ? "✔" : "❌"}</p>
            {product.Stock ? (
              <Button onPress={() => handleOpenModal(product.ProductName)}>
                Add
              </Button>
            ) : (
              <Button
                className="bg-slate-700 text-slate-200 px-4 py-2 my-1 rounded-lg"
                isDisabled>
                out of Stock
              </Button>
            )}
            <Modal
              isOpen={openModal === product.ProductName}
              onOpenChange={handleCloseModal}>
              <ModalContent>
                {(onClose: () => void) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {product.ProductName}
                    </ModalHeader>
                    <ModalBody className="flex flex-row items-center">
                      <Button onClick={() => handlePrev(product.ProductName)}>
                        Prev
                      </Button>
                      {currentSlide === "details" ? (
                        <div>
                          <Image
                            src={product.Image}
                            alt={`product-${product.ProductName} thumbnail`}
                            width={200}
                            height={200}
                            className="object-contain aspect-square border-2 border-black m-3 rounded-xl"
                          />
                          <p>{product.Price}$</p>
                        </div>
                      ) : (
                        <div>
                          <Card>
                            <CardBody className="flex-col flex gap-1">
                              <Chip>
                                <span>CategoryID: </span>
                                {product.CategoryID}
                              </Chip>
                              {product.Filters.map((f) => (
                                <Chip key={f.Filter}>
                                  <span>FilterID: {f.Filter} </span>
                                  <span>OptionID: {f.Option} </span>
                                </Chip>
                              ))}
                            </CardBody>
                          </Card>
                        </div>
                      )}

                      <Button onClick={() => handleNext(product.ProductName)}>
                        Next
                      </Button>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Action
                      </Button>
                    </ModalFooter>

                    {/* 
                      <Tabs aria-label="Dynamic tabs" items={filteredProducts}>
                        <Tab key="details" title="Details"></Tab>
                        <Tab
                          key="options"
                          title="Options"
                          href={`?${product.ProductName}-Options`}>
                          <Card>
                            <CardBody className="flex flex-row gap-2">
                              <Chip>
                                <span>CategoryID: </span>
                                {product.CategoryID}
                              </Chip>
                              {product.Filters.map((f) => (
                                <Chip key={f.Filter}>
                                  <span>FilterID: {f.Filter} </span>
                                  <span>OptionID: {f.Option} </span>
                                </Chip>
                              ))}
                            </CardBody>
                          </Card>
                        </Tab>
                      </Tabs> */}
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
