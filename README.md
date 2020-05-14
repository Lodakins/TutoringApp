# Tutoring App
This project is a restful api developed for integrating with the backend of the Tutoring Application
### Current Version
The current version of this api is version 1 (v1)
### Root Endpoint
The root end point for the api is 
### Authentication
Apart from the register and login endpoints, all others require an authentication token with you will get after a successfull login
### Request and Resoponse Sample
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
