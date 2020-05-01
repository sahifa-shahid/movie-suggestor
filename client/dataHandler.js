import {db} from './firebaseHandler'
import React, {useState, useEffect} from 'react'

export default function GetData() {
    const [data, setData] = useState()

    useEffect(() => {
      db.collection("users").doc("sahifa")
      .onSnapshot(function (doc) {
        setData(doc.data())
      })
    }, [])
    if(data !== undefined){
        console.log(data)
        return(data)
    } else {
        return("bob")
    }
}