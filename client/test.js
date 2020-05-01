import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {auth, db} from './firebaseHandler'
import * as firebase from 'firebase'
import 'firebase/firestore'

function addMovie (title) {
    const user = auth.currentUser;
    db.collection("users").doc(user.uid).update({
        movies: firebase.firestore.FieldValue.arrayUnion({title: title, rating: 5})
    }).catch(() => { 
        db.collection("users").doc(user.uid).set({
            movies: firebase.firestore.FieldValue.arrayUnion({title: title, rating: 5})
    });
})
}


export default function Testing({data}) {
    return(
    <View style={{alignItems: "center", justifyContent:"center", flex: 1}}>
        <Text>Testing</Text>
        {data.movies.map(movie => <Text>{movie.title}</Text>)}
        <TouchableOpacity onPress={() => addMovie("j")}><Text>Click to add</Text></TouchableOpacity>
    </View>
    )
}
