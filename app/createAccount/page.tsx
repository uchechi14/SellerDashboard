/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import SideBarAccount from "../components/accountComponents/SideBarAccount";
// import AccountDetail from "../components/accountComponents/AccountDetail";
import BrandDetails from "../components/accountComponents/BrandDetails";
import BrandOffice from "../components/accountComponents/BrandOffice";
import Upload from "../components/accountComponents/Upload";
import CreatedAccount from "../components/accountComponents/CreatedAccount";
import { s3 } from "@/aws-config";
import { supabase } from "../utils/superBaseClient";
import { UserUserData } from "../utils/userData";
import Progress_modal from "../components/accountComponents/progress_modal";
import { useRouter } from "next/navigation";
import Spinner from "../components/generalComponent/spinner";

const Home = () => {
  const [step, setStep] = useState(1);
  const [isuploading, setisuploading] = useState(false);
  const [progress_word, setprogress_word] = useState<any>("");
  const [progress_number, setprogress_number] = useState<any>(0);
  const [values, setValues] = useState<any>({});
  const { user } = UserUserData();
  const [authChecked, setAuthChecked] = useState(false); // State to track if auth check is done
  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, type, files, value } = e.target;

    setValues((prevValues: any) => {
      if (type === "file") {
        return {
          ...prevValues,
          [name]: files.length > 0 ? files[0] : prevValues[name], // Store file
        };
      } else {
        return { ...prevValues, [name]: value }; // Store text input
      }
    });
  };

  // console.log(values);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Upload function started...");

    try {
      // Helper function to upload a file to S3
      const uploadFile = async (file: any, fileKey: any) => {
        setisuploading(true);
        if (!file) return null;
        console.log(`Uploading ${fileKey}...`);

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
          const percnet: any = Math.round(
            (progress.loaded / progress.total) * 100
          );
          console.log(
            `${fileKey} Upload Progress: ${Math.round(
              (progress.loaded / progress.total) * 100
            )}%`
          );
          setprogress_number(percnet);
          setprogress_word(fileKey);
        });

        const { Location } = await upload.promise();
        console.log(`${fileKey} Uploaded:`, Location);
        return Location;
      };

      // Upload all files and store URLs
      const brandLogoUrl = await uploadFile(values.brandLogo, "Brand Logo");
      const brandImage1Url = await uploadFile(
        values.brandImage1,
        "Brand Image 1"
      );
      const brandImage2Url = await uploadFile(
        values.brandImage2,
        "Brand Image 2"
      );
      const brandImage3Url = await uploadFile(
        values.brandImage3,
        "Brand Image 3"
      );
      const documentUrl = await uploadFile(
        values.branddocument,
        "Brand Document"
      );

      console.log("All files uploaded! Now inserting into Supabase...");
      setisuploading(false);

      // Insert Data into Supabase Seller Table
      const { data, error } = await supabase.from("seller").insert([
        {
          street_name: values.streetName,
          street_number: values.streetNumber,
          city: values.city,
          country: values.country,
          brand_name: values.brandName,
          phone_number: values.phoneNumber,
          brand_logo: brandLogoUrl,
          brand_image1: brandImage1Url,
          brand_image2: brandImage2Url,
          brand_image3: brandImage3Url,
          brand_street_name: values.brandStreetName,
          brand_street_number: values.brandStreetNumber,
          brand_city: values.brandCity,
          brand_country: values.brandCountry,
          document_type: values.idType,
          document_url: documentUrl,
          created_at: new Date().toISOString(),
          user_id: user.userId,
        },
      ]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        alert("Failed to store data in Supabase.");
        return;
      }

      setStep(4);
      console.log("Data successfully inserted into Supabase!", data);
      // alert("Data uploaded and stored successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const checkUserSession = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        router.push("/login");
        return;
      }

      const userId = session.user.id;
      const { data: sellerData, error } = await supabase
        .from("seller")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching seller data:", error);
        return;
      }

      if (sellerData) {
        router.push("/dashboard");
      } else {
        setAuthChecked(true);
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);
  if (!authChecked) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh] bg-[#F1EFE8]">
        <div className="h-[5rem]">
          <Spinner bg={"black"} />
        </div>
      </div>
    );
  }

  return (
    <>
      {step == 4 && <CreatedAccount />}
      {isuploading && (
        <Progress_modal
          progress_word={progress_word}
          progress_number={progress_number}
        />
      )}
      <div className="w-full flex justify-center bg-[#F1EFE8] items-center min-h-[100vh]  ">
        <div className="md:w-[95%] w-full px-[1rem] md:px-0 flex justify-between items-center md:gap-[35px] ">
          <SideBarAccount step={step} />
          <div className=" w-[100%] md:mt-0 mt-[13rem] md:py-[1rem] pb-[2rem] md:pl-[450px] md:pr-[1rem]">
            {/* {step == 1 && <AccountDetail setStep={setStep} />} */}
            {step == 1 && (
              <BrandDetails
                setStep={setStep}
                handleChange={handleChange}
                values={values}
              />
            )}
            {step == 2 && (
              <BrandOffice
                setStep={setStep}
                handleChange={handleChange}
                values={values}
              />
            )}
            {step == 3 && (
              <Upload
                setStep={setStep}
                handleChange={handleChange}
                values={values}
                handleSubmit={handleSubmit}
                // name="document"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
