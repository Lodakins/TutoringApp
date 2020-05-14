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

```
{
 "email":"ploar@gmail.com
   "password":"polar"
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

```
{
 "email":"ploar@gmail.com
   "password":"polar"
}
```
