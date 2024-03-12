import React from "react";

import RemoteDebugger from "./components/RemoteDebugger";
import { QueryDevtoolProps } from "./types";

const QueryNativeDevtool: React.FC<QueryDevtoolProps> = ({
  queryClient,
  version = "v5",
  useRemoteDebugger = false,
}) => {
  return (
    <>
      {useRemoteDebugger && (
        <RemoteDebugger queryClient={queryClient} version={version} />
      )}
    </>
  );
};

export { QueryNativeDevtool };
