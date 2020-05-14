# Tutoring App
This project is a restful api developed for integrating with the backend of the Tutoring Application
## Overview
* Current Version
* Root Endpoint
* Authentication
* Request and Response Sample





### Current Version
The current version of this api is version 1 (v1)
### Root Endpoint
The root end point for the api is 
### Authentication
Apart from the register and login endpoints, all others require an authentication token with you will get after a successfull login
### Request and Resoponse Sample
Error  Response Sample | Success Response Sample
------------ | -------------
```
{
    status:false,
    message:"This is a message"
}
``` 
|
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
Content in the first column | Content in the second column
Error  Response Sample


### Student Signup
POST /signup
Requst paramter can be JSON or url encoded
{
    firstName:
    lastName:
    email:
    password:
    gender:
    phoneNumber:
}
Response:
