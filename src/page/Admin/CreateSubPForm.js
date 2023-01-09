import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { storage } from "../../firebase";
import { ColorsList, SizesList } from "../../recoil/Products";
import ProductService from "../../services/ProductService";
const CreateSubPForm = ({ subProduct, setSubProduct }) => {
  const colors = useRecoilValue(ColorsList);
  const sizes = useRecoilValue(SizesList);
  const [imgUrls, setImgUrls] = useState([]);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const handleChangeImg = async (e) => {
    try {
      const file = e.target.files[0];
      const imageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrls((prev) => [...prev, url]);
          });
        }
      );
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  useEffect(() => {
    if (!color || !size || imgUrls.length < 1) return;
    const listSize = size.map((item) => {
      return {
        size_id: item,
        image_url: imgUrls[0],
        quantity: 0,
      };
    });
    setSubProduct({
      [color]: listSize,
    });
  }, [color, size, imgUrls, setSubProduct]);
  return (
    <div className="mt-2 border-b-2 border-dashed border-gray-500">
      <div className="w-full flex justify-between">
        <div className="flex flex-1 flex-col mb-4  mr-4">
          <label className="text-xl font-medium mb-2 flex items-center">
            Add color <RiErrorWarningLine className="ml-2" />
          </label>
          <Select
            options={ProductService.convertColorsToSelectElementData(colors)}
            styles={{
              singleValue: (styles, { data }) => {
                return {
                  ...styles,
                  backgroundColor: data.label,
                };
              },
              option: (styles, { data }) => {
                return {
                  ...styles,
                  ":hover": {
                    backgroundColor: data.label,
                  },
                };
              },
            }}
            onChange={(e) => {
              setColor(e.value);
            }}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label className="text-xl font-medium mb-2 flex items-center">
            Add size <RiErrorWarningLine className="ml-2" />
          </label>
          <Select
            options={ProductService.convertSizesToSelectElementData(sizes)}
            isMulti
            onChange={(e) => {
              setSize(e.map((item) => item.value));
            }}
          />
        </div>
      </div>
      <div className="mb-8 w-full">
        <label className="text-xl font-medium mb-2 flex items-center">
          Product image <RiErrorWarningLine className="ml-2" />
        </label>
        <div className="flex items-center">
          <div className="max-w-[140px] rounded-lg shadow-xl bg-gray-50 pb-2">
            <div className="mx-4 my-2 pt-2">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-24 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Upload a file
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={handleChangeImg}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex ml-4 overflow-x-hidden flex-wrap">
            {imgUrls.map((url) => (
              <div className="h-24 w-28 mr-2 mb-1 relative" key={url}>
                <img className="w-full h-full" src={url} alt="product" />
                <span
                  className="absolute -top-2 right-0 p-1 cursor-pointer"
                  onClick={() => {
                    setImgUrls((prev) => prev.filter((item) => item !== url));
                  }}
                >
                  x
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubPForm;
