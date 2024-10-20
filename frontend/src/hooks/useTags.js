import { useState } from "react";

const predefinedTags = [
  "Birds",
  "Foods",
  "Fraveling",
  "Art",
  "Animals",
  "Music",
  "Comic",
  "Anime",
  "Education",
];

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return {
    predefinedTags,
    tags,
    newTag,
    setNewTag,
    addTag,
    removeTag,
  };
};
