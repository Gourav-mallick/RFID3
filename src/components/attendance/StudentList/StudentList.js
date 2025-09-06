import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function StudentList({ students }) {
  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.stuId}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.studentName} - Present</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
});
