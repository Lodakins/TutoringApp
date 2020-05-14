# Tutoring App
This project is a restful api developed for integrating with the backend of the Tutoring Application
### Current Version
The current version of this api is version 1 (v1)
### Root Endpoint
The root end point for the api is 
### Authentication
Apart from the register and login endpoints, an API Key is required to be sent as part of every request to the backend, in the form of an ` x-access-token` request header.it is generated when you login use successfully login.

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

The /signup endpoint register the student on the plattform

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

The `/tutor/signup` endpoint register the student on the plattform

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

### GENERAL FUNCTIONALITES(student,tutor,admin)

#### RETRIEVE ALL CATEGORIES
__GET /__

The `/categories` endpoint returns the list of all categories. 

Requires API Key as `x-access-token` request header.

Success Response
```
{
    "status": true,
    "categories": [
        {
            "subjects": [],
            "_id": "5ebd605e54b32b46245c0294",
            "categoryName": "jss",
            "categoryDescription": "this is a category for jss school student",
            "createdAt": "2020-05-14T15:14:38.876Z",
            "updatedAt": "2020-05-14T15:14:38.876Z",
            "__v": 0
        },
        {
            "subjects": [],
            "_id": "5ebd608d54b32b46245c0295",
            "categoryName": "primary",
            "categoryDescription": "this is a category for primary school student",
            "createdAt": "2020-05-14T15:15:25.547Z",
            "updatedAt": "2020-05-14T15:15:25.547Z",
            "__v": 0
        }
    ]
}
```


#### RETRIEVE A SUJECT IN A CATEGORY BY ID
__GET /category/:categoryId/subject/:subjectId__

The `/category/:categoryId/subject/:subjectId` endpoint returns a particular subject in a category; 

Requires API Key as `x-access-token` in request header.

Success Response
```
{
    "status": true,
    "subject": {
        "tutors": [],
        "_id": "5ebd7f5aafc6580310254cc0",
        "subjectName": "english language",
        "subjectDescription": "this subject is about  english language",
        "category": "5ebd605e54b32b46245c0294",
        "__v": 0
    }
}
```


### GET ALL SUBJECTS IN A CATEGORY

__GET /category/:categoryId/subjects__

The `/category/:categoryId/subjects` endpoint show all subjects in a particular category;

Requires API Key as `x-access-token` in request header. `:categoryId` should be replaced with the category id

Success Response
```
{
"status": true,
    "subjects": [
        {
            "tutors": [],
            "_id": "5ebd7f5aafc6580310254cc0",
            "subjectName": "english language",
            "subjectDescription": "this subject is about  english language",
            "category": "5ebd605e54b32b46245c0294",
            "__v": 0
        }
    ]
}
```
### SEARCH FOR SUBJECTS BY NAME

__GET /subject?name=subjectName__

The `/subject?name=subjectName` endpoint search for  subjects by name;

Requires API Key as `x-access-token:""` in request header.


Success Response 
```
{
    "status": true,
    "subjects": [
        {
            "tutors": [],
            "_id": "5ebd7ef2afc6580310254cbe",
            "subjectName": "mathematics",
            "subjectDescription": "this subject is about  mathematics",
            "category": "5ebd608d54b32b46245c0295",
            "__v": 0
        }
    ]
}
```

### SEARCH FOR TUTOR BY FIRST NAME

__POST /tutor?firstName={{tutorName}}__

he ` /tutor?firstName={{tutorName}}` endpoint search for  tutor by name;

Requires API Key as `x-access-token:""` in request header and a `userId paramter in the body`.

Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```

Success Response
```
{
    "status": true,
    "tutors": [
        {
            "isAdmin": false,
            "subjects": [],
            "lessons": [],
            "category": [],
            "active": true,
            "_id": "5ebd5321738f8b39cc53e12d",
            "firstName": "tutor",
            "lastName": "tech",
            "password": "$2b$12$MM7IAshgtdzGshYbV6eyre1pHVsBdqgHsDbGrq0iAi29BqtrTg80.",
            "gender": "male",
            "email": "tutor1@gmail.com",
            "phoneNumber": "09087563423",
            "createdAt": "2020-05-14T14:18:09.714Z",
            "updatedAt": "2020-05-14T14:18:09.714Z",
            "__v": 0
        }
    ]
}
```





