import React, { useRef } from 'react';

import { StyleSheet } from 'react-native';

import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import Devtool from '../src/components/Devtool';
import FloatingButton from '../src/components/FloatingButton';
import RemoteDebugger from '../src/components/RemoteDevtool';
import { QueryDevtoolProps } from '../src/types';

const QueryNativeDevtool: React.FC<QueryDevtoolProps> = ({
  queryClient,
  version = 'v5',
  hideFloatingButton = false,
  useRemoteDevtool = true,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <React.Fragment>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.container}
        gestureEnabled={false}
        headerAlwaysVisible
      >
        <Devtool queryClient={queryClient} version={version} />
      </ActionSheet>

      {!hideFloatingButton && (
        <FloatingButton onPress={() => actionSheetRef.current?.show()} />
      )}

      {useRemoteDevtool && (
        <RemoteDebugger queryClient={queryClient} version={version} />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b1521',
  },
});

export { QueryNativeDevtool };
