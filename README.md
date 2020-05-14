# Tutoring App
This project is a restful api developed for integrating with the backend of the Tutoring Application
### Current Version
The current version of this api is version 1 (v1)
### Root Endpoint
The root end point for the api is 
### Authentication
Apart from the register and login endpoints, all others require an authentication token with you will get after a successfull login
### Request and Resoponse Sample

Request paramter can be JSON or url encoded paramter

## Error  Response Sample
```
{
    status:false,
    message:"This is a message"
}
``` 
## Success Response Sample
 ```
{
    status:true,
    tutor:[
        {
            name:uuuu,
            id:_9000000
        }
    ]
}
```


### Student Signup
__POST /signup__


Parameters

Name | type
------------ | -------------
firtName | String
lastName | String
email | String
password | String
gender | String
phoneNumber | String
```
{
    "firstName":"polaris"
    "lastName":"oool"
    "email":"ploar@gmail.com
   "password":"polar"
    "gender":"male
    "phoneNumber":"09023456789
}
```
Response Code
```
{
    status:true,
    message:"Registration successfull"
}
```
### Tutor Signup
__POST /tutor/signup__

Parameters

Name | type
------------ | -------------
firtName | String
lastName | String
email | String
password | String
gender | String
phoneNumber | String


```
{
    "firstName":"polaris"
    "lastName":"oool"
    "email":"ploar@gmail.com
   "password":"polar"
    "gender":"male
    "phoneNumber":"09023456789
}
```
### Student Login
__POST /login__

A token,userId is generated after a successfull login which will needed to access other endpoint, so therefore make sure you keep it safe. 

Parameters

Name | type
------------ | -------------
email | String
password | String


Request Sample
```
{
 "email":"ploar@gmail.com
   "password":"polar"
}
```
Success Reponse:
```
{
    "status": true,
    "userId": "5ebd5325678f8b39cc53e12d",
    "email": "tut@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1dG9yMUBnbWFpbC5jb20iLCJpZCI6IjVlYmQ1MzIxNzM4ZjhiMzljYzUzZTEyZCIsImlhdCI6MTU4OTQ2NjA2OSwiZXhwIjoxNTg5NjM4ODY5fQ.LaPQHfIv6Tl58MaiN7y-kdkkdkdkdkdkdk"
}
```

### Tutor Login
__POST /tutor/login__

A token,userId is generated after a successfull login which will needed to access other endpoint, so therefore make sure you keep it safe. 

Parameters

Name | type
------------ | -------------
email | String
password | String

Request
```
{
 "email":"ploar@gmail.com
   "password":"polar"
}
```
Success Reponse:
```
{
    "status": true,
    "userId": "5ebd5325678f8b39cc53e12d",
    "email": "tut@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1dG9yMUBnbWFpbC5jb20iLCJpZCI6IjVlYmQ1MzIxNzM4ZjhiMzljYzUzZTEyZCIsImlhdCI6MTU4OTQ2NjA2OSwiZXhwIjoxNTg5NjM4ODY5fQ.LaPQHfIv6Tl58MaiN7y-kdkkdkdkdkdkdk"
}
```

### GENERAL FUNCTIONALITES

## RETRIEVE A SUJECT IN A CATEGORY BY ID
__POST /category/:categoryId/subject/:subjectId__

A token is needed the header

```
x-access-token: 23456787654sdfghjhgfdse456fdsdfgre;
```


