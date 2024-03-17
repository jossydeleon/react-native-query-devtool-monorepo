# React Query Native Devtool 🐵 Monorepo

React Native Query Devtool is a monorepo containing a React Native component and a standalone app to visualize query data in a similar way to react-query-devtools for the web.

![Screenshot](https://github.com/jossydeleon/react-native-query-devtool-monorepo/assets/25192002/981f444f-4a27-4d41-8a95-bab861d7edab)

## Features

- Provides a component for integrating query data in React Native applications running react-query v3, and @tanstack/react-query v4 and v5.
- (Optional) Includes a standalone app to visualize and help debug query data.

## Installation

To use the devtool component in your React Native project, install the package using `npm` or `yarn`, You will also need to install `react-native-gesture-handlers` if you haven't already.

```bash
npm install react-native-gesture-handler @jsmdeleon/react-native-query-devtool
# or
yarn add react-native-gesture-handler @jsmdeleon/react-native-query-devtool
```

## Usage

In your React Native application, import `QueryNativeDevtool`

```javascript
import { QueryNativeDevtool } from "@jsmdeleon/react-native-query-devtool";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Main />
      </View>
      <QueryNativeDevtool queryClient={queryClient} useRemoteDevtool={false} />
    </QueryClientProvider>
  );
}
```

## Support for react-query v3

If your app runs `react-query v3` pass `version="v3"` prop to `QueryNativeDevtool`

## Available Props

| Prop Name            | Type        | Description                                | Default Value |
| -------------------- | ----------- | ------------------------------------------ | ------------- |
| `queryClient`\*      | QueryClient | First name of the user                     | undefined     |
| `version`            | string      | Last name of the user                      | "v5"          |
| `hideFloatingButton` | boolean     | Hides Floating button                      | false         |
| `useRemoteDevtool`   | boolean     | Enable remote debugging via standalone app | true          |

## Standalone app (Optional)

If you want more room to debug your query data, you can download the standalone app from the following link. Currently, it's available only for **macOS M1** and **Windows x64**. Check [Standalone Repo](https://github.com/jossydeleon/react-native-query-devtool-monorepo/tree/main/packages/react-native-query-devtool-app)

```javascript
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryNativeDevtool queryClient={queryClient} useRemoteDevtool={true} />
    </QueryClientProvider>
  );
}
```

[Download latest App](https://github.com/jossydeleon/react-native-query-devtool-monorepo/releases)

**Note:** The binaries provided are not signed. If you have concerns about security or trust, you can choose to build the app from the source code for your machine.

**Linux users:** You need to build the app from source as it's currently only available for **macOS M1** and **Windows x64**. Ensure to set up your environment accordingly before building the app.

```bash
# Go to app folder
cd packages/react-native-query-devtool-app

# Install dependencies
yarn

# Build
yarn build-server
```

After running the build command, you'll find the freshly built app in a new folder named **'out'**.

**Important:** The standalone app uses port `9017` by default. Ensure that this port is available and not blocked by any firewall settings or other applications on your system.

## Examples

In the example folder, you can find example projects demonstrating the usage of `@jsmdeleon/react-native-query-devtool` with different versions of React Query (v3, v4, and v5). To test the examples, navigate to the example folder, select the desired example, and run yarn ios or yarn android.

[Examples Repo](https://github.com/jossydeleon/react-native-query-devtool-monorepo/tree/main/example)

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

## Contributions

Contributions to improve this project are welcome! If you have any ideas for new features, enhancements, bug fixes, or optimizations, feel free to submit a pull request. You can also report any bugs or issues you encounter by opening a new issue
