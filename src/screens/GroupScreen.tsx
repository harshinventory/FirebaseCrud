import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Button,
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
  const [groupData, setGroupData] = useState([]);
  const [nameAddress, setNameAddress] = useState('');
  const [names, setNames] = useState([]);
  const [chatData, setChatData] = useState([]);
  console.log('group data', groupData);
  console.log('names', names);
  useEffect(() => {
    GroupData();
    findName();
  }, []);

  const renderDate = (date: Date) => {
    return <Text style={styles.time}>{date}</Text>;
  };

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

  const chat = async () => {
    const res = await firebase.firestore().collection('chat').get();
    const chat = res.docs.forEach(item => {
      const itemdata = item.data();
      console.log(itemdata);
      chatData.push(...chatData, itemdata);
    });

    // console.log(
    //   'res chat app',
    //   (await res.get()).forEach(item => {
    //     console.log(item.data());
    //   }),
    // );
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text>{(item.message)}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            style={styles.list}
            data={chatData}
            keyExtractor={item => {
              return item;
            }}
            renderItem={renderItem}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                chat();
              }}>
              <Text>Res in chat</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              onChangeText={(name_address: string) =>
                setNameAddress(name_address)
              }
            />
          </View>

          <TouchableOpacity style={styles.btnSend}>
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
    // flex: 1,
    marginVertical: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',

    // borderRadius: 300,
    // padding: 5,
  },
});
