// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC--RxiyZqVkUJLj_2MkZSJUjOVz2TYkMw',
  authDomain: 'rnfirebasecrud-163ef.firebaseapp.com',
  projectId: 'rnfirebasecrud-163ef',
  storageBucket: 'rnfirebasecrud-163ef.appspot.com',
  messagingSenderId: '444927800727',
  appId: '1:444927800727:web:b712d5e7717835e2ba40d2',
  measurementId: '${config.measurementId}',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
