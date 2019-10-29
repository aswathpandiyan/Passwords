import * as firebase from 'firebase'; 
const model = {
    password: {
      items: [],
      // 👇 define actions
      add: (state, payload) => {
        state.items.push(payload) // 👈 you mutate state to update (we convert
                                  //    to immutable updates)
      },
     
      remove:(state,payload)=>{
        state.items.pop(payload);
      }
    },//password
    user:{
      uid:null,
      email:'',
      setUid:(state,payload) => {
        state.uid = payload;
      },
      setEmail: (state,payload) =>{
        state.email = payload;
      }
    }
  }
  module.exports = model;