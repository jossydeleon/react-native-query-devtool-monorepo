import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getUsers, postUser } from "../api";
import { UserDetail } from "./UserDetail";

export function Users() {
  const queryClient = useQueryClient();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Queries
  const { data = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchInterval: 10 * 1000,
  });

  // Mutations
  const { mutate, isPending } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const openDetails = (user) => {
    setSelectedUser(user);
    setModalOpen(!!user);
  };

  return (
    <>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openDetails(item)}>
              <View style={styles.userContainer}>
                <Image src={item.avatar} style={styles.avatar} />
                <View style={styles.textContainer}>
                  <Text style={styles.textName}>{item.fullname}</Text>
                  <Text style={styles.textJob}>{item.jobTitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <ActivityIndicator size="large" animating={isPending} />
      </View>

      <UserDetail
        userId={selectedUser?.id}
        modalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        setSelectedUser={setSelectedUser}
      />

      <Button title="Add User" disabled={isPending} onPress={mutate} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  textContainer: {
    alignContent: "center",
  },
  textName: {
    color: "white",
    padding: 5,
    fontWeight: "bold",
  },
  textJob: {
    color: "white",
    padding: 5,
    fontSize: 13,
  },
});
