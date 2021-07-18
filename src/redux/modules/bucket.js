import { ContactSupportOutlined } from "@material-ui/icons";
import { firestore } from "../../firebase";

// Actions
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";
const UPDATECOMPLETED = "bucket/UPDATECOMPLETED";
const UPDATENOTE = "bucket/UPDATENOTE";

// is loaded
const LOADED = "bucket/LOADED";

const initialState = {
  is_loaded: false,
  list: [
    // { text: "영화관 가기", completed: false },
    // { text: "매일 책읽기", completed: false },
    // { text: "수영 배우기", completed: false },
  ],
};

// const bucket_db_load = firestore
// .collection("bucket")
// .orderBy("completed", "desc");
const bucket_db = firestore.collection("bucket");

// Action Creators
export const loadBucket = (bucket) => {
  return { type: LOAD, bucket };
};

export const createBucket = (bucket) => {
  return { type: CREATE, bucket };
};

export const deleteBucket = (bucket) => {
  return { type: DELETE, bucket };
};

export const updateBucket = (bucket) => {
  return { type: UPDATE, bucket };
};

export const updateBucketNote = (bucket_index, bucketNote) => {
  return { type: UPDATENOTE, bucket_index, bucketNote };
};

export const updateBucketCompleted = (bucket) => {
  return { type: UPDATECOMPLETED, bucket };
};

// loaded를 받아서 is_loaded 값을 true/false로 바꿔줄 액션 생성 함수입니다.
export const isLoaded = (loaded) => {
  return { type: LOADED, loaded };
};

// 파이어베이스랑 통신하는 부분
export const loadBucketFB = () => {
  return function (dispatch) {
    bucket_db.get().then((docs) => {
      let bucket_data = [];
      docs.forEach((doc) => {
        // 도큐먼트 객체를 확인해보자!
        console.log(doc);
        // console.log(doc.data().bucket_note);
        // 도큐먼트 데이터 가져오기
        console.log(doc.data());
        // 도큐먼트 id 가져오기
        console.log(doc.id);

        if (doc.exists) {
          const bucketNoteVal = doc.data().bucket_note;
          bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
          console.log(doc.data().bucket_note);
        }
      });
      console.log(bucket_data);
      // 이제 액션이 디스패치 되도록 해줍시다! 그러면 끝!
      dispatch(loadBucket(bucket_data));
    });
  };
};

export const addBucketFB = (bucket) => {
  return function (dispatch) {
    // 요청 보내기 전에 스피너를 보여줍시다
    dispatch(isLoaded(false));

    // 생성할 데이터를 미리 만들게요!
    let bucket_data = {
      text: bucket,
      completed: false,
      bucket_note: "초기값으로 생성한 노트!",
    };

    // add()에 데이터를 넘겨줍시다!
    bucket_db
      .add(bucket_data)
      .then((docRef) => {
        // id를 추가한다!
        bucket_data = {
          ...bucket_data,
          id: docRef.id,
          bucket_note: docRef.bucket_note,
        };

        console.log(docRef.bucket_note);

        // 성공했을 때는? 액션 디스패치!
        dispatch(createBucket(bucket_data));
        console.log(bucket_data);

        // 스피너도 다시 없애줘야죠!
        dispatch(isLoaded(true));
      })
      .catch((err) => {
        // 여긴 에러가 났을 때 들어오는 구간입니다!
        console.log(err);
        window.alert("오류가 났네요! 나중에 다시 시도해주세요!");
        // 스피너도 다시 없애줘야죠!
        dispatch(isLoaded(true));
      });
  };
};

export const updateBucketFB = (bucket) => {
  return function (dispatch, getState) {
    // state에 있는 값을 가져옵니다!
    const _bucket_data = getState().bucket.list[bucket];

    // id가 없으면? 바로 끝내버립시다.
    if (!_bucket_data.id) {
      return;
    }

    if (_bucket_data.completed === true) {
      let bucket_data = { ..._bucket_data, completed: false };
      bucket_db
        .doc(bucket_data.id)
        .update(bucket_data)
        .then((res) => {
          dispatch(updateBucketCompleted(bucket));
        })
        .catch((err) => {
          console.log("err");
        });
    } else {
      // 새로운 값을 만들어요!
      let bucket_data = { ..._bucket_data, completed: true };

      bucket_db
        .doc(_bucket_data.id)
        .update(bucket_data)
        .then((res) => {
          dispatch(updateBucket(bucket));
        })
        .catch((err) => {
          console.log("err");
        });
    }
  };
};
export const updateBucketNoteFB = (bucket_index, bucketNote) => {
  return function (dispatch, getState) {
    // console.log(getState);
    // state에 있는 값을 가져옵니다!
    const _bucket_data = getState().bucket.list[bucket_index];
    // console.log(getState().bucket.list[bucket_index]);
    // id가 없으면? 바로 끝내버립시다.
    if (!_bucket_data.id) {
      return;
    }

    // 새로운 값을 만들어요!
    let bucket_data = { ..._bucket_data, bucket_note: bucketNote };
    bucket_db
      .doc(bucket_data.id)
      .update(bucket_data)
      .then((res) => {
        console.log(bucketNote);
        dispatch(updateBucketNote(bucket_index, bucketNote));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteBucketFB = (bucket) => {
  return function (dispatch, getState) {
    const _bucket_data = getState().bucket.list[bucket];
    // id가 없으면? 바로 끝내버립시다.
    if (!_bucket_data.id) {
      return;
    }
    // 삭제하기
    bucket_db
      .doc(_bucket_data.id)
      .delete()
      .then((res) => {
        dispatch(deleteBucket(bucket));
      })
      .catch((err) => {
        console.log("err");
      });
  };
};

// Reducer
export default function reducer(state = initialState, action) {
  console.log("action: ", action);
  switch (action.type) {
    // do reducer stuff
    case "bucket/LOAD": {
      if (action.bucket.length > 0) {
        return { list: action.bucket, is_loaded: true };
      }

      return state;
    }

    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list };
    }

    case "bucket/DELETE": {
      const bucket_list = state.list.filter((l, idx) => {
        if (idx !== action.bucket) {
          return l;
        }
      });
      return { ...state, list: bucket_list };
    }

    case "bucket/UPDATE": {
      const bucket_list = state.list.map((l, idx) => {
        if (idx === action.bucket) {
          console.log(action.bucket);
          return { ...l, completed: true };
        }
        return l;
      });
      return { ...state, list: bucket_list };
    }

    // Completed의 값을 false로 변경
    case "bucket/UPDATECOMPLETED": {
      const bucket_list = state.list.map((l, idx) => {
        if (idx === action.bucket) {
          console.log(action.bucket);
          return { ...l, completed: false };
        }
        return l;
      });
      return { ...state, list: bucket_list };
    }

    // NOTE 값 변경
    case "bucket/UPDATENOTE": {
      console.log(state.list);
      console.log(action);
      const bucket_list = state.list.map((l, idx) => {
        if (idx === action.bucket_index) {
          console.log(action.bucketNote);

          return { ...l, bucket_note: action.bucketNote };
        }
        return l;
      });
      console.log(bucket_list);
      console.log("state: ", state);
      return { ...state, list: bucket_list };
    }

    case "bucket/LOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    default:
      return state;
  }
}
