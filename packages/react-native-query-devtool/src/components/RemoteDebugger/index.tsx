import React from 'react';

import { QueryDevtoolProps } from '../../types';

import useRemoteDevtool from '../../hooks/useRemoteDevtool';

const RemoteDebugger: React.FC<QueryDevtoolProps> = ({
  queryClient,
  version,
}) => {
  useRemoteDevtool({ queryClient, version });

  return null;
};

export default RemoteDebugger;
