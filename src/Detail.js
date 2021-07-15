// 리액트 패키지를 불러옵니다.
import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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

const Detail = (props) => {
  const dispatch = useDispatch();

  // 스토어에서 상태값 가져오기
  const bucket_list = useSelector((state) => state.bucket.list);

  console.log(bucket_list);
  // url 파라미터에서 인덱스 가져오기
  let bucket_index = parseInt(props.match.params.index);
  const buttonLable = bucket_list[bucket_index].completed
    ? "완료취소"
    : "버킷완료";

  const [bucketNote, setBucketNote] = useState("testValue");
  console.log(bucket_list[bucket_index].bucket_note);
  console.log(bucketNote);
  return (
    <div>
      <h1>{bucket_list[bucket_index].text}</h1>
      <form id="noter-save-form" method="POST">
        <div className="form-group">
          <label for="exampleFormControlTextarea1"></label>
          <textarea
            type="text"
            name="textarea"
            id="textarea"
            rows="20"
            cols="49"
            onChange={() => {
              setBucketNote(document.getElementById("textarea").value);
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
            setBucketNote(document.getElementById("textarea").value);
            console.log(bucketNote);
            dispatch(updateBucketNoteFB(bucket_index, bucketNote));
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
          버킷삭제
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.history.goBack();
          }}
        >
          홈으로
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Detail;
