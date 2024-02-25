import React from "react";
import useQueryDevtool from "./hooks/useQueryDevtool";
import { QueryDevtoolProps } from "./types";

const QueryNativeDevtool: React.FC<QueryDevtoolProps> = ({
  queryClient,
  version = "v5",
}) => {
  useQueryDevtool({ queryClient, version });

  return null;
};

export { QueryNativeDevtool };
