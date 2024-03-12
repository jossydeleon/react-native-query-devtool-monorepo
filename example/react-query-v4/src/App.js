import { registerRootComponent } from "expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Users } from "./components/Users";
import { QueryNativeDevtool } from "@jsmdeleon/react-native-query-devtool/src";

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.title}>React Query V4 Example</Text>
          <Users />
        </View>
      </QueryClientProvider>

      <QueryNativeDevtool queryClient={queryClient} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});

registerRootComponent(App);
