import {AsyncStorage} from 'react-native';
class Storage{
    static async setUserId(user_id){
        try {
            await AsyncStorage.setItem('UserID', user_id);
          } catch (error) {
            // Error saving data
            console.log(error);
          }
    }
    static async getUserId(){
        try {
            const value = await AsyncStorage.getItem('UserID');
            if (value !== null) {
              // We have data!!
              console.log('calling getUSerid',value);
              return value;
            }
          } catch (error) {
            // Error retrieving data
            console.log(error);
          }
    }
    static async isUserExist(){
        try {
            const value = await AsyncStorage.getItem('UserID');
            if (value !== null) {
              // We have data!!
              return true;
            }else{
                return false;
            }
          } catch (error) {
            // Error retrieving data
            console.log(error);
          }
    }
    static async removeAll(){
        try {
            await AsyncStorage.clear();
            console.warn('clear all');
          } catch (error) {
            console.log(error);
        }   
    };
    static async setPasswords(user_id,item){
        try {
          console.log('setpassword parms',user_id,item);
          var jsonOfItem = await AsyncStorage.setItem(user_id,JSON.stringify(item));
            console.log('setting passwords',jsonOfItem);
          } catch (error) {
            // Error saving data
            console.log(error);
          }
    };
    static async getPasswords(user_id){
        try {
             await AsyncStorage.getItem(user_id).then((result)=>{
              console.log('getting passwords',result)
            });
          } catch (error) {
            // Error retrieving data
            console.log(error);
          }
          

    }
};
module.exports = Storage;