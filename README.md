# Tutoring App
This project is a restful api developed for integrating with the backend of the Tutoring Application
### Current Version
The current version of this api is version 1 (v1)
### Root Endpoint
The root end point for the api is  `https://glacial-brook-30590.herokuapp.com/v1 `
### Authentication
Apart from the register and login endpoints, an API Key is required to be sent as part of every request to the backend, in the form of an ` x-access-token` request header.it is generated when you login use successfully login.

### ADMIN DETAILS 
Admin details are found in a file called admin.txt inside the middleware folder  

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
__GET /categories__

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

The ` /tutor?firstName={{tutorName}}` endpoint search for  tutor by name

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

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

## STUDENT FUNCTIONALITIES
#### GET ALL TUTORS TAKING A PARTICULAR SUBJECT IN A CATEGORY

__POST /tutors/:categoryId/:subjectId__

The `/tutors/:categoryId/:subjectId` endpoint retrieve all tutors taking a subject belonging to a category

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

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
        },
        {
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

#### BOOK LESSON (STUDENT / ADMIN)

__POST /lesson__

The `/lesson` endpoint  enable a student book lesson passing the parameters below.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
    "name":"vlesson";
    "date":"2020-02-22";
    "time":"11:00pm";
    "subjectId":"svfgsfgf";
    "tutorId":"eere4343gdsbfb";
    "studentId":"dddttee333d4";
}
```
Sample Success Response
```
{
    "status": true,
    "message": "You have successfully book for lessons"
}
``` 

### TUTOR FUNCTIONALITIES

#### REGISTER TO TAKE A SUBJECT

__POST /subject/register/:categoryId/:subjectId__

The `/subject/register/:categoryId/:subjectId` endpoint  enable a tutor to register for a subject in a category.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "message": "You have successfully register"
}
``` 

#### TUTOR  SEE ALL REGISTERED SUBJECTS 

__POST  /tutor/subjects__

The ` /tutor/subjects` endpoint  enable a tutor to register for a subject in a category.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "subjects": [
        {
            "tutors": [
                "5ebd5321738f8b39cc53e12d"
            ],
            "_id": "5ebd7f5aafc6580310254cc0",
            "subjectName": "english language",
            "subjectDescription": "this subject is about  english language",
            "category": "5ebd605e54b32b46245c0294",
            "__v": 0
        }
    ]
}
```

#### TUTOR TO UPDATE A REGISTERED SUBJECT

__PUT  /tutor/subject/:subjectId__

The ` /tutor/subject/:subjectId` endpoint  enable a tutor to update a registered subject.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
    "subjectDescription":"this is a sample"
    "subjectName":"Mathmatics"
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Subject Update Sucessfully"
}
```

#### TUTOR TO DELETE A REGISTERED SUBJECT

__DELETE  /tutor/subject/:subjectId__

The ` /tutor/subject/:subjectId` endpoint  enable a tutor to update a registered subject.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Registered Subject Deleted successfully"
}
```

### ADMIN FUNCTIONALITIES.

#### CREATE SUBJECT 

__POST /subject/create__

The `/subject/create` endpoint  enable admin to create a subject in a category.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
    "subjectDescription":"this is a sample"
    "subjectName":"Mathmatics"
    "categoryId":"rtyuio23543oiyui34iu4ioiu3";
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Subject create successfully",
    "subject": {
        "tutors": [],
        "_id": "5ebd7f8fafc6580310254cc2",
        "subjectName": "civic education",
        "subjectDescription": "this subject is about  civic education",
        "category": "5ebd605e54b32b46245c0294",
        "__v": 0
    }
}
```

#### UPDATE SUBJECT 

__PUT /subject/:categoryId/:subjectId__

The `/subject/:categoryId/:subjectId` endpoint  enable admin to update a subject.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
    "subjectDescription":"this is a sample"
    "subjectName":"Mathmatics" 
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Subject create successfully",
    "subject": {
        "tutors": [],
        "_id": "5ebd7f8fafc6580310254cc2",
        "subjectName": "civic education",
        "subjectDescription": "this subject is about  civic education",
        "category": "5ebd605e54b32b46245c0294",
        "__v": 0
    }
}
```

#### DELETE SUBJECT 

__DELETE /subject/:categoryId/:subjectId__

The `/subject/:categoryId/:subjectId` endpoint  enable an admin to delete a  subject.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Subject Deleted successfully"
}
```

#### DELETE CATEGORY 

__DELETE /category/:categoryId__

The `  /category/:categoryId  ` endpoint  enable an admin to delete a  category.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Category Deleted successfully"
}
```
#### GET ALL TUTORS

__GET /tutors__ 

The `/tutors` endpoint  enable an admin to retrieve all tutors.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "tutors": [
        {
            "isAdmin": false,
            "subjects": [],
            "lessons": [
                "5ebd97810680195374200c4a"
            ],
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
            "updatedAt": "2020-05-14T20:40:03.271Z",
            "__v": 0
        }
    ]
}

```
#### GET TUTOR BY ID

__GET  /tutor/:tutorId__

The `/tutor/:tutorId` endpoint  enable an admin to get a tutor by id.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "tutors": [
        {
            "isAdmin": false,
            "subjects": [],
            "lessons": [
                "5ebd97810680195374200c4a"
            ],
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
            "updatedAt": "2020-05-14T20:40:03.271Z",
            "__v": 0
        }
    ]
}

```
####  DEACTIVATE A TUTOR

__GET /tutor/deactivate/:tutorId__

The `/tutor/deactivate/:tutorId` endpoint  enable an admin to deactivate a  tutor.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Tutor deactivated successfully"
}
```
#### ALL LESSONS  
__GET /lessons__

The `/lessons` endpoint  enable an admin to retrieve all lessons.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "lessons": [
        {
            "_id": "5ebd97810680195374200c4a",
            "lessonDate": "2020-02-26T00:00:00.000Z",
            "lessonName": "genelogy",
            "lessonTime": "1:00pm",
            "subject": "5ebd7f5aafc6580310254cc0",
            "tutor": "5ebd5321738f8b39cc53e12d",
            "student": "5ebd52e6738f8b39cc53e12c",
            "__v": 0
        }
    ]
}
```

#### LESSON BY ID
__GET /lesson/:lessonId__

The `/lesson/:lessonId` endpoint  enable an admin to retrieve a lesson by id.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "lesson": [
        {
            "_id": "5ebd97810680195374200c4a",
            "lessonDate": "2020-02-26T00:00:00.000Z",
            "lessonName": "genelogy",
            "lessonTime": "1:00pm",
            "subject": "5ebd7f5aafc6580310254cc0",
            "tutor": "5ebd5321738f8b39cc53e12d",
            "student": "5ebd52e6738f8b39cc53e12c",
            "__v": 0
        }
    ]
}
```
#### UPDATE LESSSON 

__PUT /lesson/:lessonId__

The `/lesson/:lessonId` endpoint  enable admin to update a lesson.

Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body` with other parameters.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
    "name":"vlesson";
    "date":"2020-02-22";
    "time":"11:00pm";
    "tutorId":"eere4343gdsbfb";
}
```
Sample Success Response
```
{
    "status": true,
    "message": "Lesson updated successfully"
}
```

#### DELETE LESSON 

__DELETE /lesson/:lessonId__

The `/lesson/:lessonId` endpoint  enable an admin to delete a  lesson ;
Requires API Key as `x-access-token:""` in request header and a `userId parameter in the body`.

Sample Request Paramter
```
{
    "userId":"uiopoihjk23443jklkjhjk"
}
```
Sample Success Response
```
{
    "status": true,
    "message": "lesson deleted successfully"
}
```