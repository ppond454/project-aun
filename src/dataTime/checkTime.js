import { db } from "../config/firebase"

export const checkTime = (date, time, id) => {
  try {
    let isAvailable = false
    db
      .database()
      .ref(`Data`)
      .on("value", (snap) => {
        let emailList = []
        let data = snap.val()
        for (let id in data) {
          emailList.push({ id, ...data[id] })
        }
        for( let j in emailList){
          if(emailList[j].date === date && emailList[j].time === time  ){
            if(emailList[j].studentID === id){
              return isAvailable = false
            }
            else
              return isAvailable = true
          }
        }
      })

    return isAvailable
  } catch (err) {
    throw err
  }
}
