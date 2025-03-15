/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BaseLayout from "@/app/BaseLayout";
import Header from "@/app/components/dashboard/Header";
// import ProductUploaded from "@/app/components/products/ProductUploaded";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";

import { supabase } from "@/app/utils/superBaseClient";
import { LuPlus } from "react-icons/lu";
import TextEditor from "@/app/components/generalComponent/TextEditor";
import { s3 } from "@/aws-config";
import UploadProductModal from "@/app/components/products/UploadProductModal";

const UploadProducts = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // const handleSubmit = (): void => {
  //   setIsOpen(!isOpen);
  // };

  const [uploadProgress, setUploadProgress] = useState<any>(0);
  const [progress_word, setprogress_word] = useState<any>("");
  const [categories, setCategories] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const [sizes, setSizes] = useState<any>([]);
  // const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [searchColor, setSearchColor] = useState<any>("");
  const [whatIsInTheBox, setwhatIsInTheBox] = useState("");
  const [extraInformation, setextraInformation] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<any>(null);
  const [isUploading, setIsUploading] = useState<any>(false);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "",
    gender: "",
    description: "",
    images: Array(6).fill({ image: null, size: [] }),
  });
  const [imageState, setImageState] = useState<{
    productBoxes: {
      image: File | null;
      size: { size: string; input: string }[];
      color: string;
      readAsText: boolean;
    }[];
  }>({
    productBoxes: Array.from({ length: 6 }, () => ({
      image: null,
      size: [] as { size: string; input: string }[],
      color: "",
      readAsText: false,
    })),
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: categorydata } = await supabase
        .from("cubby_category") // Replace with your actual table name
        .select("*");
      const { data: colorData } = await supabase
        .from("cubby_color")
        .select("*");
      const { data: sizeData } = await supabase.from("cubby_sizes").select("*");
      setCategories(categorydata || []);
      setColors(colorData || []);
      setSizes(sizeData || []);
    };

    fetchData();
  }, []);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-") // Replace spaces & special characters with "-"
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
  };

  // Console log the slug when input changes
  useEffect(() => {
    if (formState.name) {
      const slug = generateSlug(formState.name);
      console.log("Generated Slug:", slug);
    }
  }, [formState.name]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const uploadFile = async (file: any, fileKey: any) => {
    console.log(file);
    setIsUploading(true);
    if (!file) return null;
    console.log(`Uploading ${fileKey}...`);
    setIsUploading(true);

    // const fileName = file.name;
    // setUploadProgress(fileName);

    if (!process.env.NEXT_PUBLIC_S3_BUCKET_NAME) {
      throw new Error("S3 bucket name is not defined");
    }

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `uploads/${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (progress) => {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      console.log(
        `${fileKey} Upload Progress: ${Math.round(
          (progress.loaded / progress.total) * 100
        )}%`
      );
      setUploadProgress(percent);
      setprogress_word(fileKey);
    });

    const { Location } = await upload.promise();
    console.log(`${fileKey} Uploaded:`, Location);
    return Location;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setUploadProgress([]);
    setIsUploading(true);
    console.log("Filtering product boxes for images...", imageState);
    console.log("Image details", formState);
    console.log("whatIsInTheBox", whatIsInTheBox);
    console.log("extraInformation", extraInformation);

    const filteredBoxes = imageState.productBoxes.filter(
      (box) => box.image !== null
    );

    const uploadedBoxes = await Promise.all(
      filteredBoxes.map(async (box, idx) => {
        if (box.image instanceof File) {
          const imageUrl = await uploadFile(box.image, `Box ${idx + 1}`);
          return { ...box, image: imageUrl };
        }
        return box;
      })
    );

    setIsUploading(false);

    console.log("Filtered and uploaded product boxes:", uploadedBoxes);

    // Generate product slug from the name
    const productSlug = generateSlug(formState.name);
    console.log("ttsy:", formState);

    // Store data in Supabase
    const { data, error } = await supabase
      .from("product")
      .insert([
        {
          name: formState.name,
          slug: productSlug,
          price: formState.price,
          category: formState.category,
          gender: formState.gender,
          description: formState.description,
          // images: uploadedBoxes.map((box) => box.image), // ✅ Store only image URLs
          whats_in_it: whatIsInTheBox,
          extra_note: extraInformation,
        },
      ])
      .select("id") // ✅ Retrieve the UUID (id) of the inserted row
      .single(); // ✅ Ensure we get a single object, not an array

    if (error) {
      console.error("Error inserting product into Supabase:", error);
      return;
    }
    const productUUID = data.id; // ✅ This is the UUID of the inserted product
    console.log("Product successfully stored in Supabase:", data);
    console.log("Product UUID:", productUUID); // ✅ Logging the UUID

    for (const box of imageState.productBoxes) {
      console.log("Product UUID:", box.color); // ✅ Logging the UUID

      // Insert image details into Supabase
      const { data: imageData, error: imageError } = await supabase
        .from("images") // Table for product images
        .insert([
          {
            product_id: productUUID,
            image_url: box.image, // Assuming this holds the image URL
            color: box.color || null, // Color or null
            is_color: box.readAsText ? false : true, // Check if color is active
            is_default: false, // Define default behavior (modify as needed)
          },
        ])
        .select("id") // Fetch the inserted row ID
        .single();

      if (imageError) {
        console.error("Error inserting product image:", imageError);
        continue; // Skip to the next image if there's an error
      }

      const imageId = await imageData.id; // Get inserted image ID
      console.log("Inserted image ID:", imageId);

      // Check if sizes exist for the image
      if (box.size && box.size.length > 0) {
        console.log("I size.size:", box.size, productUUID, imageId);

        const sizeEntries = box.size.map((size) => ({
          image_id: imageId, // Link to inserted image
          size: size.size, // Assuming 'size' is the size ID
          stock: size.input ? parseInt(size.input, 10) : 0, // Convert stock input to integer
          product_id: productUUID,
        }));

        // Insert size details into Supabase
        const { error: sizeError } = await supabase
          .from("sizes") // Table for size stocks
          .insert(sizeEntries);

        if (sizeError) {
          console.error("Error inserting sizes for image:", imageId, sizeError);
        } else {
          console.log("Sizes successfully stored for image:", imageId);
        }
      }
    }
  };

  const handleImageSelection = (index: number, file: File | null) => {
    if (!file) return;
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];
      updatedBoxes[index] = { ...updatedBoxes[index], image: file };
      return { ...prev, productBoxes: updatedBoxes };
    });
  };
  const handleSizeSelection = (index: number, selectedValue: string) => {
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];

      if (!updatedBoxes[index]) {
        updatedBoxes[index] = { image: null, size: [], color: "" };
      }

      // Ensure `size` is an array of objects with `{ size: string, input: string }`
      const selectedSizes = updatedBoxes[index].size || [];

      // Add size only if it's not already selected
      if (!selectedSizes.some((item) => item.size === selectedValue)) {
        updatedBoxes[index] = {
          ...updatedBoxes[index],
          size: [...selectedSizes, { size: selectedValue, input: "" }],
        };
      }

      return { ...prev, productBoxes: updatedBoxes };
    });
  };

  const handleSizeInputChange = (
    index: number,
    size: string,
    value: string
  ) => {
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];

      // Ensure size is an array before mapping
      if (!Array.isArray(updatedBoxes[index].size)) {
        updatedBoxes[index].size = [];
      }

      updatedBoxes[index].size = updatedBoxes[index].size.map((item) =>
        item.size === size ? { ...item, input: value } : item
      );

      return { ...prev, productBoxes: updatedBoxes };
    });
  };

  const handleColorSelection = (index: number, color: string) => {
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];
      updatedBoxes[index] = { ...updatedBoxes[index], color };
      return { ...prev, productBoxes: updatedBoxes };
    });
  };

  const handleReadAsTextToggle = (index: number) => {
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];

      updatedBoxes[index] = {
        ...updatedBoxes[index],
        readAsText: !updatedBoxes[index].readAsText, // ✅ Toggle between true/false
        color: !updatedBoxes[index].readAsText ? "" : updatedBoxes[index].color, // ✅ Clear color when reading as text
        size: !updatedBoxes[index].readAsText ? [] : updatedBoxes[index].size, // ✅ Clear sizes when reading as text
      };

      return { ...prev, productBoxes: updatedBoxes };
    });
  };

  console.log(sizes, "mtysizes");

  return (
    <BaseLayout>
      <UploadProductModal
        progress={uploadProgress}
        progress_word={progress_word}
        isUploading={isUploading}
      />
      ;
      <div>
        <Header
          title="Upload Products"
          note="Post and upload your products for purchase"
        />

        <form
          onSubmit={handleSubmit}
          className="w-full flex text-sm justify-center bg-white  py-5 rounded-[20px] mt-5"
        >
          <div className="w-[95%] ">
            <Link href="/product">
              <div className="flex items-center text-sm gap-2">
                <BiSolidLeftArrow /> BACK TO PRODUCTS
              </div>
            </Link>
            <div className="mt-5 md:flex gap-3">
              <div className="w-full">
                <p className=" text-black opacity-[50%]">Add product name</p>
                <div className="w-full mt-1 ">
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="bg-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"
                  />
                </div>
              </div>
              <div className="w-full">
                <p className=" text-black opacity-[50%] ">Enter price</p>
                <div className="w-full flex items-center mt-1">
                  <input
                    type="number"
                    name="price"
                    value={formState.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    className="bg-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"
                  />
                  <div className="w-[55px] rounded-[20px] py-[6px] bg-white absolute right-[75px] flex justify-center items-center">
                    ₦
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 md:flex gap-3">
              <div className="w-full">
                <p className=" text-black opacity-[50%] ">Enter product type</p>
                <div className="w-full mt-1">
                  <select
                    name="category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="w-full bg-[#e0e0e0] outline-none rounded-[15px] py-[15px] px-[20px]  text-black opacity-[50%]"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <p className=" text-black opacity-[50%] ">Enter Gender</p>
                <div className="w-full mt-1">
                  <select
                    name="gender"
                    value={formState.gender}
                    onChange={handleInputChange}
                    className="w-full bg-[#e0e0e0] outline-none rounded-[15px] py-[15px] px-[20px]  text-black opacity-[50%]"
                  >
                    <option value="Male">MALE</option>
                    <option value="Female">FEMALE</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className=" text-black opacity-[50%] ">
                Add product Description
              </p>
              <div className="w-full mt-1">
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="bg-[#F0F0F0] pl-[20px] w-full rounded-[15px] py-[15px] outline-none"
                />
              </div>
            </div>
            <div className="border-t-[1px] border-[#D9D9D9] w-full mt-5"></div>
            {/* Support Images Section */}
            <div className="mt-3">
              <p className=" text-black opacity-[50%] ">Add Images</p>
              <div className="w-full flex-wrap gap-4 grid md:grid-cols-3 lg:grid-cols-6 grid-cols-2 py-3">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="rounded-lg">
                    <label className="w-full aspect-[1/1] relative bg-[#E9E9E9] rounded-[20px] block cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleImageSelection(
                            index - 1,
                            e.target.files?.[0] || null
                          )
                        }
                      />
                      {imageState.productBoxes[index - 1]?.image ? (
                        <img
                          src={URL.createObjectURL(
                            imageState?.productBoxes[index - 1]?.image
                          )}
                          alt="Preview"
                          className="absolute inset-0 object-cover w-full h-full rounded-[20px]"
                        />
                      ) : (
                        <div className="flex justify-center items-center absolute inset-0">
                          <LuPlus className="text-[25px]" />
                        </div>
                      )}
                    </label>
                    {/* Read as Text & Add Color Checkboxes */}
                    <div className="flex gap-3 mt-2 flex-col">
                      {/* ✅ Default: Add Color (Checked by default) */}
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={
                            !imageState.productBoxes[index - 1]?.readAsText
                          }
                          onChange={() => handleReadAsTextToggle(index - 1)}
                        />
                        Add Color
                      </label>
                    </div>

                    {/* ✅ Show Color & Size ONLY if "Read as Text" is NOT selected */}
                    {!imageState.productBoxes[index - 1]?.readAsText ? (
                      <>
                        {/* Size Selection */}
                        <select
                          className="w-full mt-2 p-2 text-sm outline-none border rounded-lg bg-white text-black"
                          onChange={(e) =>
                            handleSizeSelection(index - 1, e.target.value)
                          }
                          value=""
                        >
                          <option value="">Select Size</option>
                          {sizes
                            .filter(
                              (size: any) =>
                                !imageState.productBoxes[index - 1]?.size.some(
                                  (s) => s.size === size.id
                                )
                            )
                            .map((size: any) => (
                              <option key={size.id} value={size.sizes}>
                                {size.sizes}
                              </option>
                            ))}
                        </select>
                        <p className="mt-2">Selected Sizes:</p>
                        <div className=" flex gap-[0.5rem] flex-wrap">
                          {imageState.productBoxes[index - 1]?.size?.map(
                            (
                              { size, input }: { size: string; input: string },
                              idx: number
                            ) => (
                              <div
                                key={idx}
                                className=" bg-[#E9E9E9] px-[1rem] py-[0.5rem] rounded-[5px] flex gap-[0.4rem] text-xs items-center"
                              >
                                <p className="text-xs"> {size}</p>{" "}
                                {/* ✅ Now properly accessing `size` */}
                                <input
                                  type="number"
                                  className="w-[2.5rem] h-[2rem] border border-black border-opacity-20 rounded-[5px] outline-none px-[6%]"
                                  placeholder="Qty"
                                  value={input} // ✅ Display the stored input value
                                  onChange={
                                    (e) =>
                                      handleSizeInputChange(
                                        index - 1,
                                        size,
                                        e.target.value
                                      ) // ✅ Pass the correct `size` value
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>

                        {/* Color Dropdown */}
                        <div className="relative w-full mt-2">
                          <button
                            className="w-full p-3 border rounded-lg bg-white text-black text-left"
                            onClick={() =>
                              setOpenDropdownIndex(
                                openDropdownIndex === index - 1
                                  ? null
                                  : index - 1
                              )
                            }
                            type="button"
                          >
                            {imageState.productBoxes[index - 1]?.color ||
                              "Select Color"}
                          </button>
                          {openDropdownIndex === index - 1 && (
                            <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 text-sm">
                              <input
                                type="text"
                                placeholder="Search color..."
                                value={searchColor}
                                onChange={(e) => setSearchColor(e.target.value)}
                                className="w-full p-2 border-b rounded-t-md text-black"
                              />
                              <ul className="max-h-40 overflow-y-auto">
                                {colors
                                  .filter((color: any) =>
                                    color.color_name
                                      .toLowerCase()
                                      .includes(searchColor.toLowerCase())
                                  )
                                  .map((color: any) => (
                                    <li
                                      key={color.id}
                                      onClick={() => {
                                        handleColorSelection(
                                          index - 1,
                                          color.color_name
                                        );
                                        setOpenDropdownIndex(null);
                                        setSearchColor("");
                                      }}
                                      className="p-3 cursor-pointer hover:bg-gray-200 text-sm"
                                    >
                                      {color.color_name}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-sm mt-1 ">
                        Image will be displayed as text
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t-[1px] border-[#D9D9D9] w-full mt-5"></div>
            <div className=" w-full flex flex-col gap-1 mt-5">
              <div className="">
                <p className=" text-black opacity-[50%] mt-2">
                  What comes in the box
                </p>
                <TextEditor
                  placeholder="how are you"
                  setfunc={setwhatIsInTheBox}
                  value={whatIsInTheBox || ""}
                />
              </div>{" "}
              <div className="">
                <p className=" text-black opacity-[50%] mt-2">
                  Extra information
                </p>
                <TextEditor
                  setfunc={setextraInformation}
                  placeholder="how are you"
                  value={extraInformation || ""}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5 ">
              <button
                className="px-[13px] text-white py-[7px] bg-[#0171E3] text-[16px] rounded-full"
                type="submit"
              >
                Upload
              </button>
              <button className="px-[13px] py-[7px] bg-[#000000] text-[16px] text-white rounded-full">
                Archive
              </button>
            </div>
          </div>
        </form>

        {/* <div
          className={`bg-bgTrans justify-center flex items-center w-full fixed  top-0 left-0 h-screen ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ProductUploaded handleSubmit={handleSubmit} />{" "}
        </div> */}
      </div>
    </BaseLayout>
  );
};

export default UploadProducts;
