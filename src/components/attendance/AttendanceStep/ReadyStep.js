import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimeDisplay from "../../common/DateTimeDisplay/DateTimeDisplay";
import DumyCardButton from "../../common/Button/SecondaryButton";

export default function ReadyStep({ onPress, openClasses = [], onSelectClass }) {
  return (
    <View style={styles.container}>
      <DateTimeDisplay />
      <Text style={styles.status}>Ready to scan</Text>

      {/* Start new class */}
      <DumyCardButton title={"Start New Class (dummy class scan)"} onPress={onPress} />

      {/* Show open classes if available */}
      {openClasses.length > 0 ? (
        <>
          <Text style={styles.instructionTitle}>Open Classes</Text>
          <FlatList
            data={openClasses}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardBox} onPress={() => onSelectClass(item)}>
                <Text style={styles.cardText}>
                  <Text style={{ fontWeight: "700" }}>Class: </Text>{item.classRoom}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={{ fontWeight: "700" }}>Teacher: </Text>{item.teacher}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={{ fontWeight: "700" }}>Students: </Text>{item.students.length}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text style={{ marginTop: 20, fontSize: 14, color: '#555' }}>
          No active classes right now.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  status: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
  instructionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  cardBox: {
    backgroundColor: '#d6cfcf',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  cardText: { fontSize: 16 },
});
