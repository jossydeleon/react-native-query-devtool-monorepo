import { useState } from "react";

const useJSONTreeData = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return {
    showToast,
    handleShowToast,
  };
};

export default useJSONTreeData;
