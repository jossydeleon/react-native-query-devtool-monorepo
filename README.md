# React Query Native Devtool

React Native Query Devtool is a monorepo containing a React Native component and a standalone app to visualize query data in a similar way to react-query-devtools for the web.

## Features

- Provides a component for integrating query data in React Native applications running react-query v3, and @tanstack/react-query v4 and v5.
- Includes a standalone app to visualize and help debug query data.

## Standalone App

The standalone app allows you to visualize and debug query data from your React Native application using the `@jdl/react-native-query-devtool` package.

## Installation

You can download the standalone app from the following link. Currently, it's available only for macOS M1:

[Download latest App](https://github.com/jossydeleon/react-native-query-devtool-monorepo/releases)

**Windows and Linux users:** You need to build the app from source as it's currently only available for macOS M1. Ensure to set up your environment accordingly before building the app.

```bash
# Go to app folder
cd react-native-query-devtool-app

# Install dependencies
yarn

# Build
yarn build-server
```

## React Native Component

To use the devtool component in your React Native project, install the package:

```bash
npm install @jdl/react-native-query-devtool
# or
yarn add @jdl/react-native-query-devtool
```

## Usage

In your React Native application, import `QueryNativeDevtool` to send query data to the server app for debugging:

```javascript
import { QueryNativeDevtool } from "@jdl/react-native-query-devtool";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Main />
      </View>
      <QueryNativeDevtool queryClient={queryClient} />
    </QueryClientProvider>
  );
}
```

## Support for react-query v3

If your app runs `react-query v3` pass `version="v3"` prop to `QueryNativeDevtool`

```javascript
import { QueryNativeDevtool } from "@jdl/react-native-query-devtool";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Main />
      </View>
      <QueryNativeDevtool queryClient={queryClient} version="v3" />
    </QueryClientProvider>
  );
}
```

This will enable your React Native application to send query data to the Electron app for debugging purposes.

## Examples

In the example folder, you can find example projects demonstrating the usage of `@jdl/react-native-query-devtool` with different versions of React Query (v3, v4, and v5). To test the examples, navigate to the example folder, select the desired example, and run yarn ios or yarn android.

```bash
cd example

# Navigate to the desired example, for example:
cd react-query-v3

# Install dependencies
yarn

# Run example
yarn ios
# or
yarn android
```
