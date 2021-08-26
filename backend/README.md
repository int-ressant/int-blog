## **BACKEND DOCUMENTATION**
#### Users routes
- Register **METHOD** *POST* [https://iblogapi.herokuapp.com/api/users/register](https://iblogapi.herokuapp.com//api/users/register)
> ###### *body* 
```
{
  "username": String,
  "email": String,
  "password": Number || String
}
```
- Confirm code **METHOD** *POST* [https://iblogapi.herokuapp.com/api/users/confirmation?type=registration](https://iblogapi.herokuapp.com//api/users/confirmation?type=registration)

> ###### *body* 
```
{
  "code": Number,
  "email": String,
}
```

- Signin **METHOD** *POST* [https://iblogapi.herokuapp.com/api/users/signin](https://iblogapi.herokuapp.com//api/users/signin)

> ###### *body* 
```
{
  "username" || "email": String,
  "password": String,
}
```