import { useQuery } from "react-query";
import React from "react";
import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import { getSingleUser } from "../api";

export function UserDetail({
  userId,
  modalOpen = false,
  setModalOpen,
  setSelectedUser,
}) {
  // Queries
  const { data = {} } = useQuery({
    queryKey: ["users", { userId }],
    queryFn: () => getSingleUser(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000,
  });

  if (!modalOpen) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.userContainer}>
            <Image src={data?.avatar} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{data?.fullname}</Text>
              <Text style={styles.textJob}>{data?.email}</Text>
              <Text style={styles.textJob}>{data?.jobTitle}</Text>
            </View>
          </View>
          <Button
            title="Close"
            onPress={() => {
              setModalOpen(false);
              setSelectedUser(null);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 10,
  },
  userContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
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
