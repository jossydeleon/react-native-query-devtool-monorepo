# @jsmdeleon/react-native-query-devtool-app

## Features

Standalone app to visualize and help debug query data. You can download it from the following link. Currently, it's available only for **macOS M1** and **Windows x64**. [Download latest App](https://github.com/jossydeleon/react-native-query-devtool-monorepo/releases)

**Note:** The binaries provided are not signed. If you have concerns about security or trust, you can choose to build the app from the source code for your machine.

**Linux users:** You need to build the app from source as it's currently only available for **macOS M1** and **Windows x64**. Ensure to set up your environment accordingly before building the app.

```bash
# Go to app folder
cd react-native-query-devtool-app

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
