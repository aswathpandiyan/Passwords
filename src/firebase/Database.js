/**
 * @class Database
 */

import * as firebase from "firebase";
import 'firebase/firestore';

class Database {

    /**
     * Sets a users mobile number
     * @param userId
     * @param mobile
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static setPassword(userId, item) {
        var db = firebase.app();
        db.firestore().collection(userId).add(item)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                return docRef.id;
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    /**
     * Listen for changes to a users mobile number
     * @param userId
     * @param callback Users mobile number
     */
    static listenUserMobile(userId, callback) {

        let userMobilePath = "/user/" + userId + "/details";

        firebase.database().ref(userMobilePath).on('value', (snapshot) => {

            var mobile = "";

            if (snapshot.val()) {
                mobile = snapshot.val().mobile
            }

            callback(mobile)
        });
    }
    static listAllPasswords(userId) {
        var db = firebase.app().firestore();
        var data=[];
        db.collection(userId).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {        
                data.push(doc.data())
             });
             return data;
        });
       
    }

}

module.exports = Database;