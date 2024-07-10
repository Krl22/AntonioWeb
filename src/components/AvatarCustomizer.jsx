import React, { useState, useEffect } from "react";
import AttributeSelector from "./AttributeSelector";
import { getAssets } from "../firebaseconfig";

const AvatarCustomizer = () => {
  const [avatar, setAvatar] = useState({
    gender: "male",
    eyes: [],
    hair: [],
    eyebrows: [],
    mouth: [],
    nose: [],
    outfit: [],
  });

  const [selectedAttributes, setSelectedAttributes] = useState({
    eyes: "",
    hair: "",
    eyebrows: "",
    mouth: "",
    nose: "",
    outfit: "",
  });

  useEffect(() => {
    const loadAssets = async () => {
      const gender = avatar.gender;
      const eyes = await getAssets(`avatars/${gender}/eyes`);
      const hair = await getAssets(`avatars/${gender}/hair`);
      const eyebrows = await getAssets(`avatars/${gender}/eyebrows`);
      const mouth = await getAssets(`avatars/${gender}/mouth`);
      const nose = await getAssets(`avatars/${gender}/nose`);
      const outfit = await getAssets(`avatars/${gender}/outfit`);

      setAvatar({
        ...avatar,
        eyes,
        hair,
        eyebrows,
        mouth,
        nose,
        outfit,
      });
    };

    loadAssets();
  }, [avatar.gender]);

  const handleChange = (attribute, value) => {
    setSelectedAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full">
          {/* Aquí iría la imagen del avatar */}
          <span className="text-gray-500">Avatar</span>
        </div>
      </div>
      <div className="flex justify-around mb-4">
        <button
          className="p-2 bg-gray-200 rounded-full"
          onClick={() => setAvatar({ ...avatar, gender: "male" })}
        >
          Male
        </button>
        <button
          className="p-2 bg-gray-200 rounded-full"
          onClick={() => setAvatar({ ...avatar, gender: "female" })}
        >
          Female
        </button>
      </div>
      <AttributeSelector
        attribute="eyes"
        options={avatar.eyes}
        onChange={handleChange}
      />
      <AttributeSelector
        attribute="hair"
        options={avatar.hair}
        onChange={handleChange}
      />
      <AttributeSelector
        attribute="eyebrows"
        options={avatar.eyebrows}
        onChange={handleChange}
      />
      <AttributeSelector
        attribute="mouth"
        options={avatar.mouth}
        onChange={handleChange}
      />
      <AttributeSelector
        attribute="nose"
        options={avatar.nose}
        onChange={handleChange}
      />
      <AttributeSelector
        attribute="outfit"
        options={avatar.outfit}
        onChange={handleChange}
      />
    </div>
  );
};

export default AvatarCustomizer;
