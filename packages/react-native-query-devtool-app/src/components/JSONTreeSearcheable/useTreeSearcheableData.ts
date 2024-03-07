import { useState } from "react";

const useTreeSearcheableData = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getItemString = (data: unknown) => {
    const size = Object.keys(data).length;

    if (size === 0) {
      return null;
    }

    const pluralize = size > 1 ? "items" : "item";
    const displayText = `${size} ${pluralize}`;

    return `<span style={{ fontSize: 11 }}>${displayText}</span>`;
  };

  const highlightLabel = (label: string | number) => {
    if (!searchTerm.trim()) return label;

    const regex = new RegExp(searchTerm, "gi");
    return label
      .toString()
      .replace(
        regex,
        (match) => `<span style="background-color: purple">${match}</span>`
      );
  };

  const highlightValue = (value: string) => {
    if (!searchTerm.trim()) return value;

    const regex = new RegExp(searchTerm, "gi");
    return value
      .toString()
      .replace(
        regex,
        (match) => `<span style="background-color: yellow">${match}</span>`
      );
  };

  return {
    searchTerm,
    setSearchTerm,
    getItemString,
    highlightLabel,
    highlightValue,
  };
};

export default useTreeSearcheableData;
