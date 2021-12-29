import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GroupScreen = () => {
  const userId = 'WLTDLWFHpGMnLWLROyYO';
  const groupId = 'gpMrYUpR5Cqe7fRCYxWE';

  const [groupData, setGroupData] = useState([]);
  const [nameAddress, setNameAddress] = useState('');
  const [chatData, setChatData] = useState<any>([]);
  useEffect(() => {
    if (nameAddress.length < 1) {
      getMsg();
    }
  }, [nameAddress]);

  const getMsg = async () => {
    const res = await firebase
      .firestore()
      .collection('chat')
      .where('group_id', '==', 'gpMrYUpR5Cqe7fRCYxWE')
      .get();
    console.log('res >>> ', res);

    let data = res.docs.map(val => {
      val.data().id = val.id;
      return val.data();
    });
    console.log('data >>>> ', data);
    setChatData(data);
  };

  const GroupData = async () => {
    const group = await firebase.firestore().collection('group').get();
    const groupData = group.docs[0].data();
    setGroupData(groupData?.members);
  };

  const onPressSend = async () => {
    await firebase.firestore().collection('chat').add({
      group_id: groupId,
      latest_timestamp: Date.now(),
      message: nameAddress,
      message_type: 'text',
      sender_id: userId,
    });
    setNameAddress('');
  };

  const chat = async () => {
    const res = await firebase
      .firestore()
      .collection('chat')
      .where('group_id', '==', 'gpMrYUpR5Cqe7fRCYxWE')
      .get();
    // const chat = res.docs.forEach(item => {
    //   let itemdata.id = item.id;
    //    itemdata = item.data();
    //   chatData.push(itemdata);
    // });
    console.log('res >>> ', res);

    let data = res.docs.map(val => {
      val.data().id = val.id;
      return val.data();
    });
    console.log('data >>>> ', data);
    setChatData(data);
  };

  const renderItem = ({item, index}: any) => {
    console.log(item);
    if (userId === item.sender_id) {
      return (
        <View style={styles.rightSideMsg}>
          <Text>{item.message}</Text>
        </View>
      );
    } else if (userId !== item.sender_id) {
      return (
        <View style={styles.leftSideMsg}>
          <Text>{item.message}</Text>
        </View>
      );
    }
    // return (
    //   <View>
    //     {userId === item.sender_id ? (

    //     ) : (

    //     )}
    //     <Text>{item.message}</Text>
    //   </View>
    // );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            style={styles.list}
            inverted
            data={chatData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </SafeAreaView>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              value={nameAddress}
              onChangeText={(name_address: string) =>
                setNameAddress(name_address)
              }
            />
          </View>
          <TouchableOpacity
            style={styles.btnSend}
            onPress={() => onPressSend()}>
            <Image
              source={{
                uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png',
              }}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#00BFFF',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 4,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  itemOut: {
    alignSelf: 'flex-end',
    backgroundColor: '#34B7F1',
    borderRadius: 10,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 4,
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginVertical: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  rightSideMsg: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    padding: 4,
  },
  leftSideMsg: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    padding: 4,
  },
});
