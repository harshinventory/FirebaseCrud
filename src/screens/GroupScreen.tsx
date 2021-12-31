// import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const GroupScreen = () => {
  const navigation = useNavigation();
  const [GroupData, setGroupData] = useState([]);
  console.log('==>', GroupData);
  useEffect(() => {
    groupDataFetch();
    loggedInUser();
  }, []);

  const renderItem = ({item, index}) => {
    console.log(index);

    return (
      <View style={styles.flatlistContainer}>
        <Text>{item.id}</Text>
        <Text>{index}</Text>
      </View>
    );
  };

  const groupDataFetch = async () => {
    const groupCollection = await firebase
      .firestore()
      .collection('group')
      .get();
    let userData = groupCollection.docs.map(val => {
      let group = val.data();
      group.id = val.id;
      return group;
    });
  };

  const loggedInUser = async () => {
    const user = firebase.auth().currentUser;
    console.log(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={GroupData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
