// 리액트 패키지를 불러옵니다.
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { ImHome } from "react-icons/im";
import { ImCheckmark, ImCheckmark2, ImFacebook2 } from "react-icons/im";
import { GoTrashcan } from "react-icons/go";

// redux hook을 불러옵니다.
import { useDispatch, useSelector } from "react-redux";
// 내가 만든 액션 생성 함수를 불러옵니다.
import {
  deleteBucket,
  updateBucket,
  deleteBucketFB,
  updateBucketFB,
  updateBucketNoteFB,
} from "./redux/modules/bucket";

// useEffect(() => {}, [bucket_list[bucket_index].bucket_note]);
const Detail = (props) => {
  const dispatch = useDispatch();

  // 스토어에서 상태값 가져오기
  const bucket_list = useSelector((state) => state.bucket.list);

  console.log(bucket_list);
  // url 파라미터에서 인덱스 가져오기
  let bucket_index = parseInt(props.match.params.index);
  const buttonLable = bucket_list[bucket_index].completed ? (
    <ImCheckmark size="30" />
  ) : (
    <ImCheckmark2 size="30" />
  );

  const [bucketNote, setBucketNote] = useState(null);
  console.log(bucket_list[bucket_index].bucket_note);
  console.log(bucketNote);

  return (
    <div>
      <h2>{bucket_list[bucket_index].text}</h2>
      <form id="noter-save-form" method="POST">
        <div className="form-group">
          {/* <label for="exampleFormControlTextarea1"></label> */}
          <textarea
            type="text"
            id="textarea"
            rows="20"
            cols="49"
            onChange={() => {
              setBucketNote(document.getElementById("textarea").value);
              dispatch(updateBucketNoteFB(bucket_index, bucketNote));
            }}
          >
            {bucket_list[bucket_index].bucket_note}
          </textarea>
        </div>
      </form>
      <ButtonGroup>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (
              document.getElementById("textarea").value ===
              bucket_list[bucket_index].bucket_note
            ) {
              return;
            }
            setBucketNote(document.getElementById("textarea").value);
            dispatch(updateBucketNoteFB(bucket_index, bucketNote));
            window.location.reload(); //화면이 바뀌면서 버킷항목이 바뀐다. 수정요망
          }}
        >
          노트저장
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            //alert("정말 삭제하시겠습니까?")
            dispatch(updateBucketFB(bucket_index));
            props.history.goBack();
          }}
        >
          {buttonLable}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(deleteBucketFB(bucket_index));
            props.history.goBack();
          }}
        >
          <GoTrashcan size="30" />
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            //추가한 노트를 저장하지 않고 홈으로 가는 경우
            if (
              document.getElementById("textarea").value !==
              bucket_list[bucket_index].bucket_note
            ) {
              //추가한 노트를 저장후 홈으로 이동
              setBucketNote(document.getElementById("textarea").value);
              dispatch(updateBucketNoteFB(bucket_index, bucketNote));
            }
            props.history.goBack();
          }}
        >
          <ImHome size="30" />
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            alert("coming soon");
          }}
        >
          <ImFacebook2 size="28" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Detail;
