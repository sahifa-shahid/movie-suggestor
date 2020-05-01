import * as firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAI5Dms1tTXc_vA5TTF6ZOwkom6lX_3GDs",
      authDomain: "scout-2b10f.firebaseapp.com",
      databaseURL: "https://scout-2b10f.firebaseio.com",
      projectId: "scout-2b10f",
      storageBucket: "scout-2b10f.appspot.com",
      messagingSenderId: "62948149005",
      appId: "1:62948149005:web:6d2b5aa5e34c4449771244",
      measurementId: "G-V544T3KFJ1"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()