//Tay Xun Yang A0218250N

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCy20AZtDyvXv5oSVxNB_F4Zj2DPVCLyRk",
  authDomain: "bt3103-assignment.firebaseapp.com",
  projectId: "bt3103-assignment",
  storageBucket: "bt3103-assignment.appspot.com",
  messagingSenderId: "375248409186",
  appId: "1:375248409186:web:9794ab04b1dabea0e5f73b",
  measurementId: "G-VSPSKW0PDL"
};

  //Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;
 