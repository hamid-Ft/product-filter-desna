import {
  Chip,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  CardHeader,
  Badge,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/stores/productsStore";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
const Products: React.FC = () => {
  const { products, selectedCategories, selectedFilters } = useStore();
  const [openModal, setOpenModal] = React.useState<string | null>(null);
  const [prevUrl, setPrevUrl] = React.useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = React.useState("details");

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);

    return params.toString();
  }, []);

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
  const handleOpenModal = (productName: string, slide: string) => {
    setPrevUrl(window.location.href);
    setTimeout(() => {
      router.replace(
        pathname + "?" + createQueryString(productName.replace(" ", "-"), slide)
      );
      setOpenModal(productName);
    }, 10);
  };

  const handleCloseModal = () => {
    if (prevUrl) {
      const url = new URL(prevUrl);
      if (openModal) {
        url.searchParams.delete(openModal.replace(" ", "-"));
      }
      window.history.replaceState({}, "", url.toString());
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = Array.from(urlParams.keys()).find((key) =>
      key.includes("Product")
    );
    const optionParam = urlParams.get(productParam || "");

    if (productParam) {
      const productName = productParam.replace("-", " ");
      handleOpenModal(productName, optionParam || "details");
      setCurrentSlide(optionParam || "details");
    }
  }, []);

  return (
    <Card
      isBlurred
      className="border-none  h-full bg-background/60 dark:bg-default-100/50 ">
      <div className="flex flex-col h-full w-full justify-start">
        <CardHeader className="flex gap-3">
          <h1 className="text-3xl font-extrabold  py-2  w-full text-center ">
            Products
          </h1>
        </CardHeader>
        <Divider />
        <div className="flex mt-2 justify-start items-center">
          <CardBody className="flex flex-row gap-4">
            {filteredProducts.map((product) => (
              <Card
                isBlurred
                key={product.ProductName}
                className="flex flex-col items-center h-full justify-start ml-1  rounded-xl bg-slate-200 dark:bg-slate-900">
                <h3 className="text-lg font-bold dark:text-slate-300 w-full text-center">
                  {product.ProductName}
                </h3>
                <Divider />
                <Image
                  src={product.Image}
                  alt={`product-${product.ProductName} thumbnail`}
                  width={200}
                  height={200}
                  className="object-contain aspect-square   m-3 rounded-xl"
                />
                <p className="font-bold">
                  <span>Price: {product.Price}$</span>
                </p>
                <p className="font-semibold py-1">
                  {product.Stock ? (
                    <Badge color="danger" content={"✔"} shape="circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5">
                        <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </Badge>
                  ) : (
                    <Badge color="danger" content={"✖"} shape="circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5">
                        <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </Badge>
                  )}
                </p>
                {product.Stock ? (
                  <Button
                    className="mb-2"
                    onPress={() =>
                      handleOpenModal(product.ProductName, currentSlide)
                    }>
                    Add
                  </Button>
                ) : (
                  <Button className="mb-2" isDisabled>
                    out of Stock
                  </Button>
                )}
                <Modal
                  className="dark:bg-slate-800"
                  backdrop="blur"
                  size="2xl"
                  isOpen={openModal === product.ProductName}
                  onOpenChange={handleCloseModal}>
                  <ModalContent>
                    {(onClose: () => void) => (
                      <>
                        <ModalHeader className="flex flex-col justify-center items-center gap-1">
                          {product.ProductName}
                        </ModalHeader>
                        <ModalBody className="flex flex-row justify-between items-stretch h-60">
                          <Button
                            className="h-auto"
                            onClick={() => handlePrev(product.ProductName)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6">
                              <path
                                fillRule="evenodd"
                                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
                          {currentSlide === "details" ? (
                            <div className="flex flex-col justify-evenly items-center h-60">
                              <Image
                                src={product.Image}
                                alt={`product-${product.ProductName} thumbnail`}
                                width={200}
                                height={200}
                                className="object-contain aspect-square  m-3 rounded-xl"
                              />
                              <p>Price: {product.Price}$</p>
                            </div>
                          ) : (
                            <div className="h-60">
                              <Card>
                                <CardBody className="flex-col flex gap-8 justify-center items-center">
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

                          <Button
                            className="h-auto"
                            onClick={() => handleNext(product.ProductName)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6">
                              <path
                                fillRule="evenodd"
                                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}>
                            Close
                          </Button>
                          <Button isDisabled color="primary" onPress={onClose}>
                            Action
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </Card>
            ))}
          </CardBody>
        </div>
      </div>
    </Card>
  );
};
export default Products;
