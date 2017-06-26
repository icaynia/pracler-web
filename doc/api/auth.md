# 1. 개요

이 문서에서는 로그인 또는 로그아웃, 회원가입, 암호화, 인증에 대한 RESTful API 사용에 관한 내용을 다룹니다.</br>
개발 중인 프로젝트이므로 API는 모두에게 공개되어 있으며 이후 예고 없이 기능이 변경될 수 있습니다.


# 2. API routes

라우터 목록입니다. 

## 2.1 localhost:5000/api/rsa/encrypt
Method : "POST"</br>
DataType : "json"</br>
Data : {"inputPassword" : String}</br>
Return : {result : Object}

inputPassword 인자를 통해 문자열을 보내면 암호화 문자열이 result.pw 를 통해 반환됩니다.

