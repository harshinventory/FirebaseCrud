import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const GroupScreen = () => {
  const [groupData, setGroupData] = useState([]);
  const [names, setNames] = useState([]);
  console.log('group data', groupData);
  console.log('names', names);
  useEffect(() => {
    GroupData();
    findName();
  }, []);

  const GroupData = async () => {
    const group = await firebase.firestore().collection('group').get();
    const groupData = group.docs[0].data();
    setGroupData(groupData?.members);
  };

  const findName = async () => {
    console.log('groupData >>>> ', groupData);
    const res = await firebase
      .firestore()
      .collection('users')
      .where(firebase.firestore.FieldPath.documentId(), 'in', groupData)
      .get();
    console.log('res >> ', res);
    let userNames = res.docs.map(val => {
      val.data().id = val.id;
      return val.data();
    });
    console.log('userNames >>>> ', userNames);
    setNames(userNames);
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
          <Text>{index}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList data={names} renderItem={renderItem} />
      {/* <View>
        <Button onPress={() => findName()} title="FindName" />
      </View> */}
    </SafeAreaView>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({});
