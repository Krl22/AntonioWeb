import React, { useEffect, useState } from "react";
import { storage, ref, listAll, getDownloadURL } from "../firebaseconfig";
import AvatarCustomizer from "../components/AvatarCustomizer";

const Avatar = () => {
  const [svgUrls, setSvgUrls] = useState([]);

  useEffect(() => {
    const fetchSvgs = async () => {
      // Reemplaza 'avatars/genero' con la ruta de tu folder en Firebase Storage
      const storageRef = ref(storage, "avatars/genero");
      const svgList = await listAll(storageRef);
      const urls = await Promise.all(
        svgList.items.map((item) => getDownloadURL(item))
      );
      setSvgUrls(urls);
    };

    fetchSvgs();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AvatarCustomizer />
    </div>
    // <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    //   {svgUrls.map((url, index) => (
    //     <img
    //       key={index}
    //       src={url}
    //       alt={`SVG ${index}`}
    //       className="object-cover w-full h-auto"
    //     />
    //   ))}
    // </div>
  );
};

export default Avatar;
