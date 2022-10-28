import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "src/_constants/firebase";

const uploadImage = async (image: File): Promise<string> => {
  if (!image) {
    return "";
  }

  try {
    const imgRef = ref(storage, `images/${v4()}`);

    const snapshot = await uploadBytes(imgRef, image);
    const imgUrl = await getDownloadURL(snapshot.ref);

    return imgUrl;
  } catch (e) {
    return "";
  }
};

export default uploadImage;
