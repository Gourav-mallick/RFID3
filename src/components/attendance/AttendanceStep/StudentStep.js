import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import DateTimeDisplay from '../../common/DateTimeDisplay/DateTimeDisplay';
import DumyCardButton from '../../common/Button/SecondaryButton';
import ForceCloseModal from '../../Modals/ForceCloseModal';

export default function StudentStep({
  students,
  teacher,
  classRoom,
  handleStudentScan,
  handleEndClass,
  showModal,
  setShowModal,
  onConfirmEnd,
  onStartNewClass, // new prop
}) {
  return (
    <View style={styles.container}>
      <DateTimeDisplay />
      <Text style={styles.counter}>Present Students: {students.length}</Text>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardBox}>
            <Text style={styles.cardText}>
              <Text style={{ fontWeight: '700' }}>{item.name}</Text> - Present
            </Text>
          </View>
        )}
      />

      <View style={styles.cardBox}>
        <Text style={styles.cardText}>
          <Text style={{ fontWeight: '700' }}>Teacher: </Text> {teacher}
        </Text>
      </View>
      <View style={styles.cardBox}>
        <Text style={styles.cardText}>
          <Text style={{ fontWeight: '700' }}>Class: </Text> {classRoom}
        </Text>
      </View>

      <View style={styles.btnRow}>
        <DumyCardButton
          onPress={handleStudentScan}
          title={'dummy All Students Scan'}
        />
        <DumyCardButton
          onPress={() => setShowModal(true)}
          title={'dummy class end Scan'}
        />
      </View>

      <View style={styles.newClassBtn}>
        <DumyCardButton
          onPress={onStartNewClass}
          title={'Start Another New Class'}
        />
      </View>

      <ForceCloseModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onConfirmEnd();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  counter: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  cardBox: {
    backgroundColor: '#d6cfcf',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  cardText: { fontSize: 16 },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  newClassBtn: { marginTop: 20, width: '100%' },
});
