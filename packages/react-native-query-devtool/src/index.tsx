import React from "react";

import Devtool from "./components/Devtool";
import RemoteDebugger from "./components/RemoteDebugger";
import { QueryDevtoolProps } from "./types";

const QueryNativeDevtool: React.FC<QueryDevtoolProps> = ({
  queryClient,
  version = "v5",

  useRemoteDebugger = false,
}) => {
  return (
    <>
      <Devtool queryClient={queryClient} version={version} />

      {useRemoteDebugger && (
        <RemoteDebugger queryClient={queryClient} version={version} />
      )}
    </>
  );
};

export { QueryNativeDevtool };
