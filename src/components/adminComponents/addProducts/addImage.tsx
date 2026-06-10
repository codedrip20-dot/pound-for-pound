import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { uploadImage } from "../../../utils/cloudinary";
import { updateProductImages } from "../../../utils/firebase";

type ProductImage = {
  id: string;
  altText: string;
  file: File | null;
  imageUrl: string;
  publicId: string;
};

const AddImages = () => {
  const location = useLocation();
  const navigate = useNavigate();
 console.log("Received UID in AddImages:", location.state);

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<ProductImage[]>([
    {
      id: "primary",
      altText: "",
      file: null,
      imageUrl: "",
      publicId: "",
    },
    {
      id: "secondary",
      altText: "",
      file: null,
      imageUrl: "",
      publicId: "",
    },
    {
      id: "third",
      altText: "",
      file: null,
      imageUrl: "",
      publicId: "",
    },
    {
      id: "fourth",
      altText: "",
      file: null,
      imageUrl: "",
      publicId: "",
    },
  ]);

  const handleFileChange = (
    index: number,
    file: File | null
  ) => {
    const updatedImages = [...images];

    updatedImages[index].file = file;

    if (file) {
      updatedImages[index].imageUrl =
        URL.createObjectURL(file);
    }

    setImages(updatedImages);
  };

  const handleAltTextChange = (
    index: number,
    value: string
  ) => {
    const updatedImages = [...images];

    updatedImages[index].altText = value;

    setImages(updatedImages);
  };

  const handleUpload = async () => {
    try {
      const { uid } = location.state;
      if (!uid) {
        alert("Product UID not found.");
        return;
      }

      const selectedImages = images.filter(
        (image) => image.file
      );

      if (selectedImages.length === 0) {
        alert("Please select at least one image.");
        return;
      }

      setLoading(true);

      const uploadedImages = await Promise.all(
        images.map(async (image) => {

          if (!image.file) return image;

          const result = await uploadImage(
            image.file,
            uid,
            );
          
         

          return {
            ...image,
            imageUrl: result.secure_url,
            publicId: result.public_id,
          };
        })
      );

      setImages(uploadedImages);

      console.log("✅ Uploaded Images");
      console.log(uploadedImages);

      const firestoreImages = uploadedImages
        .filter((image) => image.imageUrl)
        .map((image) => ({
            id: image.id,
            imageUrl: image.imageUrl,
            publicId: image.publicId,
            altText: image.altText,
        }));

        console.log("🔥 Firestore Images");
        console.log(firestoreImages);

        // NEXT STEP
        await updateProductImages(uid, firestoreImages);
        alert("Images uploaded and Firestore updated successfully!");
        navigate('/admin');
    } catch (error) {
      console.error("Upload Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Step 2
          </h1>

          <h2 className="text-xl text-neutral-400 mb-10">
            Upload Product Images
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.01 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5"
            >
              <div className="mb-4">
                <h3 className="capitalize font-semibold text-lg">
                  {image.id} Image
                </h3>
              </div>

              <div className="h-72 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 mb-4 flex items-center justify-center">
                {image.imageUrl ? (
                  <img
                    src={image.imageUrl}
                    alt={image.altText}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-neutral-500">
                    No Image Selected
                  </p>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="w-full mb-4 text-sm"
                onChange={(e) =>
                  handleFileChange(
                    index,
                    e.target.files?.[0] || null
                  )
                }
              />

              <input
                type="text"
                placeholder="Alt Text"
                value={image.altText}
                onChange={(e) =>
                  handleAltTextChange(
                    index,
                    e.target.value
                  )
                }
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 outline-none"
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={handleUpload}
          className="mt-10 w-full md:w-auto bg-white text-black font-semibold px-8 py-4 rounded-xl disabled:opacity-50"
        >
          {loading
            ? "Uploading Images..."
            : "Upload Images"}
        </motion.button>
      </div>
    </div>
  );
};

export default AddImages;