//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyBY1U8ClMOp6J4SdclIF1hg7g1KLp6jhaw",
  authDomain: "bucketlist-73696.firebaseapp.com",
  projectId: "bucketlist-73696",
  storageBucket: "bucketlist-73696.appspot.com",
  messagingSenderId: "362949241044",
  appId: "1:362949241044:web:582d406716a6e217253341",
  measurementId: "G-P4VBD9H4W5",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
