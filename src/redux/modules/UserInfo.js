import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import image from "../../assets/profile.PNG";

//유저이니셜 넣은 변수
const userName = "H";
const userTitle = "내 버킷리스트";

function UserInfo() {
  return (
    <div>
      <TopContainer>
        <Avatar src={image}>{userName}</Avatar>
      </TopContainer>
      <Title>{userTitle}</Title>
    </div>
  );
}

export default UserInfo;

const Title = styled.h1`
  color: #673ab7;
  text-align: center;
`;

const Reload = styled.h5`
  color: #ddd;
  text-align: right;
  margin: 0;
`;

const avatarConfig = styled.h6`
  color: #ddd;
  width: spacing(15);
  height: spacing(15);
`;
const TopContainer = styled.h5`
  display: flex;
  color: #ddd;
  text-align: right;
  // border: 1px solid #000;
  margin: 0;
`;
