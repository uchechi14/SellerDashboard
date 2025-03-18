"use client";
import BaseLayout from "@/app/BaseLayout";
import Header from "@/app/components/dashboard/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import imageCompression from "browser-image-compression";
import { supabase } from "@/app/utils/superBaseClient";
import { LuPlus } from "react-icons/lu";
import TextEditor from "@/app/components/generalComponent/TextEditor";
import { s3 } from "@/aws-config";
import UploadProductModal from "@/app/components/products/UploadProductModal";
import { UserUserData } from "@/app/utils/userData";

const UploadProducts = ({ slug }: { slug?: string }) => {
  const { user } = UserUserData();
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
  const [isEditing, setIsEditing] = useState(!!slug); // ✅ Check if editing
  const [productId, setProductId] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "",
    gender: "male",
    description: "",
    images: Array(6).fill({ image: null, size: [] }),
  });
  const [imageState, setImageState] = useState<{
    productBoxes: {
      id: string;
      image: File | any;
      size: { size: string; input: string }[];
      color: string;
      readAsText: boolean;
    }[];
  }>({
    productBoxes: Array.from({ length: 6 }, () => ({
      id: "",
      image: null,
      size: [] as { size: string; input: string }[],
      color: "",
      readAsText: false,
    })),
  });

  // ✅ Fetch product details if editing
  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;

      // ✅ Fetch product details
      const { data: product, error: productError } = await supabase
        .from("product")
        .select(
          "id, name, price, category, gender, description, whats_in_it, extra_note"
        )
        .eq("slug", slug)
        .single();

      if (productError || !product) {
        console.error("Error fetching product:", productError);
        return;
      }

      setProductId(product.id);
      setFormState({
        name: product.name,
        price: product.price,
        category: product.category,
        gender: product.gender,
        description: product.description,
        images: [],
      });
      setwhatIsInTheBox(product.whats_in_it);
      setextraInformation(product.extra_note);
      // ✅ Fetch product images in a specific order (e.g., newest first)
      const { data: images, error: imageError } = await supabase
        .from("images")
        .select("id, image_url, color, is_color, is_default")
        .eq("product_id", product.id)
        .order("created_at", { ascending: true }); // Change "created_at" to your timestamp column

      console.log(images);

      if (imageError) {
        console.error("Error fetching images:", imageError);
        return;
      }

      if (!images || images.length === 0) {
        return;
      }

      // ✅ Fetch all sizes from cubby_sizes table to map size IDs to names
      const { data: allSizes, error: sizeFetchError } = await supabase
        .from("cubby_sizes")
        .select("id, sizes"); // `sizes` is the size name

      if (sizeFetchError) {
        console.error("Error fetching all sizes:", sizeFetchError);
        return;
      }

      // ✅ Fetch sizes for each image and match with size names
      const imageSizePromises = images.map(async (img) => {
        const { data: sizeData, error: sizeError } = await supabase
          .from("sizes")
          .select("size, stock")
          .eq("image_id", img.id);

        console.log(img.is_color);
        if (sizeError) {
          console.error(`Error fetching sizes for image ${img.id}:`, sizeError);
          return { id: img.id, sizes: [] };
        }

        return {
          id: img.id,
          image: img.image_url,
          color: img.color,
          readAsText: img.is_color,
          size: sizeData.map((size) => ({
            size:
              allSizes.find((s: any) => s.id === size.size)?.sizes || "Unknown", // ✅ Get the correct size name
            input: String(size.stock),
          })),
        };
      });
      // ✅ Resolve all image size promises
      const productBoxes: any = await Promise.all(imageSizePromises);

      setImageState({ productBoxes });
    };

    fetchProductData();
  }, [slug]);

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
    const randomNum = Math.floor(10 + Math.random() * 90); // ✅ Generate a random 2-digit number (10-99)
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-") // ✅ Replace spaces & special characters with "-"
      .replace(/^-+|-+$/g, "") // ✅ Remove leading/trailing dashes
      .concat(`-${randomNum}`); // ✅ Append the random number
  };

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.5, // ✅ Slightly higher quality but still optimized
      maxWidthOrHeight: 1400, // ✅ Allow slightly larger images
      initialQuality: 0.8, // ✅ Keeps more details
      useWebWorker: true, // ✅ Ensures fast compression
      onProgress: (progress: any) => {
        console.log(`🛠 Compression Progress: ${progress}%`);
        setUploadProgress(progress); // ✅ Update UI with compression progress
      },
    };
    try {
      console.log(
        `⏳ Compressing ${file.name} (original size: ${file.size / 1024} KB)`
      );
      const compressedFile = await imageCompression(file, options);
      console.log(`✅ Compression completed: ${compressedFile.size / 1024} KB`);
      return compressedFile;
    } catch (error) {
      console.error("❌ Error compressing image:", error);
      return file; // Fallback to original file if compression fails
    }
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

  const uploadFile = async (
    file: File,
    fileKey: string,
    productUUID: string,
    box: any
  ) => {
    if (!file) return null;

    // ✅ Check if the file is already uploaded (URL string)
    if (typeof file === "string") {
      console.log(`Using existing image: ${file}`);
      return file;
    }

    // ✅ Compress the image before uploading
    const compressedFile = await compressImage(file);

    console.log(`Uploading compressed image for ${fileKey}...`);
    setIsUploading(true);

    if (!process.env.NEXT_PUBLIC_S3_BUCKET_NAME) {
      throw new Error("S3 bucket name is not defined");
    }

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `uploads/${Date.now()}_${compressedFile.name}`,
      Body: compressedFile,
      ContentType: compressedFile.type,
    };

    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (progress) => {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      console.log(`${fileKey} Upload Progress: ${percent}%`);
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
    console.log("Processing product submission...", formState, imageState);

    let productUUID = productId;

    if (isEditing && productUUID) {
      // ✅ Update existing product
      const { error: productUpdateError } = await supabase
        .from("product")
        .update({
          name: formState.name,
          price: formState.price,
          category: formState.category,
          gender: formState.gender,
          description: formState.description,
          whats_in_it: whatIsInTheBox,
          extra_note: extraInformation,
        })
        .eq("id", productUUID);

      if (productUpdateError) {
        console.error("Error updating product:", productUpdateError);
        return;
      }
      console.log("Product updated successfully.");
    } else {
      // ✅ Insert new product
      const productSlug = generateSlug(formState.name);
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
            seller_id: user.userId,
            whats_in_it: whatIsInTheBox,
            extra_note: extraInformation,
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error("Error inserting product:", error);
        return;
      }

      productUUID = data.id;
      setProductId(productUUID);
      console.log("New product created:", data);
    }

    // ✅ Process Images One-by-One
    for (let idx = 0; idx < imageState.productBoxes.length; idx++) {
      let box = imageState.productBoxes[idx];
      let imageUrl = box.image;

      if (box.image instanceof File) {
        // ✅ Upload new image if changed
        imageUrl = await uploadFile(
          box.image,
          `Box ${idx + 1}`,
          productUUID!,
          box
        );
      }

      let imageId = box.id; // Existing image ID (if updating)

      if (isEditing && box.id) {
        // ✅ Update existing image
        const { error: imageUpdateError } = await supabase
          .from("images")
          .update({
            image_url: imageUrl,
            color: box.color || null,
            is_color: box.readAsText,
          })
          .eq("id", box.id);

        if (imageUpdateError) {
          console.error("Error updating image:", imageUpdateError);
        }
      } else {
        // ✅ Insert new image if it has no ID
        const { data: newImage, error: newImageError } = await supabase
          .from("images")
          .insert([
            {
              product_id: productUUID!,
              image_url: imageUrl,
              color: box.color || null,
              is_color: box.readAsText,
              is_default: idx === 0, // ✅ First image is default
            },
          ])
          .select("id")
          .single();

        if (newImageError) {
          console.error("Error inserting new image:", newImageError);
          continue; // Skip size processing if image insert fails
        }

        imageId = newImage.id; // Assign new image ID
      }

      console.log(`✅ Image ${idx + 1} processed, ID: ${imageId}`);

      // ✅ Handle Sizes Immediately After Uploading Each Image
      // ✅ Handle Sizes Immediately After Uploading Each Image
      if (box.size.length > 0) {
        for (const size of box.size) {
          // ✅ Find the correct size ID from `cubby_sizes`
          const sizeEntry = sizes.find((s: any) => s.sizes === size.size);
          const sizeId = sizeEntry?.id; // Ensure we're getting the correct ID

          if (!sizeId) {
            console.warn(
              `Skipping size '${size.size}' because it doesn't exist in database.`
            );
            continue;
          }

          console.log(
            `Checking existing size for image ${imageId}, size ID: ${sizeId}`
          );

          // ✅ Fix: Use `.maybeSingle()` to prevent breaking if no row exists
          const { data: existingSize, error: sizeFetchError } = await supabase
            .from("sizes")
            .select("id")
            .eq("image_id", imageId) // Ensure we're using correct image_id
            .eq("size", sizeId) // Ensure we're using the correct size ID
            .maybeSingle(); // ✅ Use `maybeSingle()` instead of `single()`

          if (sizeFetchError) {
            console.error("Error fetching size entry:", sizeFetchError);
          }

          if (existingSize) {
            // ✅ Update existing size stock
            const { error: updateError } = await supabase
              .from("sizes")
              .update({ stock: parseInt(size.input, 10) })
              .eq("id", existingSize.id);

            if (updateError) {
              console.error("Error updating size:", updateError);
            } else {
              console.log(
                `✅ Updated size stock for size ID: ${existingSize.id}`
              );
            }
          } else {
            // ✅ Insert new size entry
            const { error: insertError } = await supabase.from("sizes").insert([
              {
                image_id: imageId, // ✅ Use updated image ID
                size: sizeId, // ✅ Use mapped size ID
                stock: parseInt(size.input, 10),
                product_id: productUUID!,
              },
            ]);

            if (insertError) {
              console.error("Error inserting new size:", insertError);
            } else {
              console.log(
                `✅ Inserted new size entry for image ID: ${imageId}, size ID: ${sizeId}`
              );
            }
          }
        }
      }

      console.log(`✅ Sizes processed for image ID: ${imageId}`);
    }

    setIsUploading(false);
    console.log("All updates applied successfully.");
  };

  const handleImageSelection = (index: number, file: File | null) => {
    if (!file) return;
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];

      updatedBoxes[index] = {
        ...updatedBoxes[index],
        image: file, // ✅ Store new image
        id: updatedBoxes[index]?.id || "", // ✅ Retain existing ID
      };

      return { ...prev, productBoxes: updatedBoxes };
    });
  };

  const handleSizeSelection = (index: number, selectedValue: string) => {
    setImageState((prev) => {
      const updatedBoxes: any = [...prev.productBoxes];

      if (!updatedBoxes[index]) {
        updatedBoxes[index] = { image: null, size: [], color: "" };
      }

      // Ensure `size` is an array of objects with `{ size: string, input: string }`
      const selectedSizes = updatedBoxes[index].size || [];

      // Add size only if it's not already selected
      if (!selectedSizes.some((item: any) => item.size === selectedValue)) {
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
    console.log(imageState.productBoxes[index].readAsText);
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];

      // Ensure object exists before modifying it
      if (!updatedBoxes[index]) {
        updatedBoxes[index] = {
          id: "",
          image: null,
          size: [],
          color: "",
          readAsText: false,
        };
      }

      const newReadAsText = !updatedBoxes[index].readAsText;

      updatedBoxes[index] = {
        ...updatedBoxes[index],
        readAsText: newReadAsText, // ✅ Toggle readAsText
        color: newReadAsText ? "" : updatedBoxes[index].color, // ✅ Reset color if readAsText is enabled
        size: newReadAsText ? [] : updatedBoxes[index].size, // ✅ Clear sizes if readAsText is enabled
      };

      return { ...prev, productBoxes: updatedBoxes };
    });
  };

  const handleDeleteSize = async (index: number, sizeName: string) => {
    const imageId = imageState.productBoxes[index]?.id;
    if (!imageId) return;

    // ✅ Find the correct size ID
    const sizeEntry = sizes.find((s: any) => s.sizes === sizeName);
    if (!sizeEntry) {
      console.warn(`⚠ Size '${sizeName}' not found in database.`);
      return;
    }

    const sizeId = sizeEntry.id; // ✅ Get the correct UUID

    console.log(
      `⏳ Deleting size '${sizeName}' (ID: ${sizeId}) from Supabase...`
    );

    // ✅ Only delete from Supabase if product is being edited
    if (isEditing) {
      const { error } = await supabase
        .from("sizes")
        .delete()
        .eq("image_id", imageId)
        .eq("size", sizeId); // ✅ Use sizeId instead of sizeName

      if (error) {
        console.error("❌ Error deleting size:", error);
        return; // Stop further execution if deletion fails
      }

      console.log(`✅ Deleted size '${sizeName}' from Supabase.`);
    }

    // ✅ Remove the size from the local array after successful deletion
    setImageState((prev) => {
      const updatedBoxes = [...prev.productBoxes];

      updatedBoxes[index].size = updatedBoxes[index].size.filter(
        (s) => s.size !== sizeName
      );

      console.log(`⚡ Removed size '${sizeName}' from local state.`);
      return { ...prev, productBoxes: updatedBoxes };
    });
  };

  const handleDeleteImage = async (index: number) => {
    setImageState((prev) => {
      // Ensure index is valid before proceeding
      if (index < 0 || index >= prev.productBoxes.length) {
        console.error(
          `❌ Invalid index: ${index} out of bounds. Current length:`,
          prev.productBoxes.length
        );
        return prev;
      }

      const imageToDelete = prev.productBoxes[index];

      if (!imageToDelete) {
        console.warn(`⚠ Image at index ${index} does not exist.`);
        return prev;
      }

      console.log(`🟡 Checking image:`, imageToDelete);

      // ✅ If the image is a File (newly uploaded, not in Supabase), remove it from local state only.
      if (imageToDelete.image instanceof File) {
        console.log(`🟡 Image is a File, removing from local state.`);
        return {
          ...prev,
          productBoxes: prev.productBoxes.filter((_, i) => i !== index),
        };
      }

      // ✅ If the image exists in Supabase (has an ID & is a URL), delete it from Supabase first.
      if (isEditing && imageToDelete.id) {
        console.log(
          `⏳ Deleting image ID: ${imageToDelete.id} from Supabase...`
        );

        supabase
          .from("images")
          .delete()
          .eq("id", imageToDelete.id)
          .then(({ error }) => {
            if (error) {
              console.error("❌ Error deleting image:", error);
            } else {
              console.log(
                `✅ Deleted image ID: ${imageToDelete.id} from Supabase.`
              );

              // ✅ Remove from local state after successful Supabase deletion
              setImageState((prev) => ({
                ...prev,
                productBoxes: prev.productBoxes.filter((_, i) => i !== index),
              }));
            }
          });
      } else {
        // ✅ Remove from local state directly if not editing
        console.log(`🟡 Image is local only, removing immediately.`);
        return {
          ...prev,
          productBoxes: prev.productBoxes.filter((_, i) => i !== index),
        };
      }

      return prev;
    });
  };

  return (
    <BaseLayout>
      <UploadProductModal
        progress={uploadProgress}
        progress_word={progress_word}
        isUploading={isUploading}
      />

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
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
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
              <p className="text-sm text-gray-500">
                The <strong>first image</strong> will be the main display image.
              </p>{" "}
              <div className="w-full flex-wrap gap-4 grid md:grid-cols-3 lg:grid-cols-6 grid-cols-2 py-3">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="rounded-lg relative">
                    {imageState.productBoxes[index - 1]?.image && (
                      <button
                        type="button"
                        className="  absolute z-[10] hover:bg-black hover:text-white bg-white p-[0.2rem] rounded-full  top-[0.5rem] right-[0.5rem] "
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation(); // ✅ Prevent file input from opening
                          handleDeleteImage(index - 1);
                        }}
                      >
                        <i className="bi bi-x-lg "></i>
                      </button>
                    )}
                    <label className="w-full   aspect-[1/1] relative bg-[#E9E9E9] rounded-[20px] block cursor-pointer">
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
                          src={
                            imageState.productBoxes[index - 1]?.image instanceof
                            File
                              ? URL.createObjectURL(
                                  imageState.productBoxes[index - 1]?.image
                                )
                              : imageState.productBoxes[index - 1]?.image // If it's a URL, use it directly
                          }
                          alt="Preview"
                          className="absolute inset-0 object-cover w-full h-full rounded-[20px]"
                        />
                      ) : (
                        <div className="flex justify-center items-center absolute inset-0">
                          <LuPlus className="text-[25px]" />
                        </div>
                      )}
                    </label>

                    {imageState.productBoxes[index - 1]?.image && (
                      <div className="w-full  ">
                        {/* Read as Text & Add Color Checkboxes */}
                        <div className="flex gap-3 mt-2 flex-col">
                          {/* ✅ Default: Add Color (Checked by default) */}
                          <label className="flex items-start text-sm gap-1">
                            <input
                              type="checkbox"
                              checked={
                                !imageState.productBoxes[index - 1]?.readAsText
                              }
                              className="mt-[0.3rem]"
                              onChange={() => handleReadAsTextToggle(index - 1)}
                            />
                            Check for color variant, uncheck for extra image{" "}
                          </label>
                        </div>
                        {/* ✅ Show Color & Size ONLY if "Read as Text" is NOT selected */}
                        {!imageState.productBoxes[index - 1]?.readAsText && (
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
                                    !Array.isArray(
                                      imageState.productBoxes[index - 1]?.size
                                    ) ||
                                    !imageState.productBoxes[
                                      index - 1
                                    ]?.size.some((s) => s.size === size.id)
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
                                  {
                                    size,
                                    input,
                                  }: { size: string; input: string },
                                  idx: number
                                ) => (
                                  <div
                                    key={idx}
                                    className=" relative bg-[#E9E9E9] px-[1rem] py-[0.5rem] rounded-[5px] flex gap-[0.4rem] text-xs items-center"
                                  >
                                    {/* Delete button */}
                                    <button
                                      type="button"
                                      className="  absolute  top-0 left-[0.2rem] "
                                      onClick={() =>
                                        handleDeleteSize(index - 1, size)
                                      }
                                    >
                                      <i className="bi bi-x-lg  text-black "></i>
                                    </button>
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
                                    onChange={(e) =>
                                      setSearchColor(e.target.value)
                                    }
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
                        )}
                      </div>
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
