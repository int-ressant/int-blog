## **BACKEND DOCUMENTATION**
#### Routes
> #### **users**
- Register **METHOD** *POST* [http://localhost:5001/api/users/register](http://localhost:5001/api/users/register)
> ###### *body* 
```
{
  "username": String,
  "email": String,
  "password": Number || String
}
```
- Confirm code **METHOD** *POST* [http://localhost:5001/api/users/confirmation?type=registration](http://localhost:5001/api/users/confirmation?type=registration)

> ###### *body* 
```
{
  "code": Number,
  "email": String,
}
```

- Signin **METHOD** *POST* [http://localhost:5001/api/users/signin](http://localhost:5001/api/users/signin)

> ###### *body* 
```
{
  "username" || "email": String,
  "password": String,
}
```