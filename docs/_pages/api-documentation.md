---
permalink: /api-documentation/
title: "API documentation"
layout: single
sidebar:
  nav: "sidebar"
toc: true
---
# crm-api

## request structure

All voyzu CRP API endpoints follow the format:

`/api/resource/operation/id`

where:
- "api" is the literal value "api"
- "resource" is the product domain you want to interact with, for example `contact`, `customer`, `auth`
- "operation" is the operation you want to perform on the resource, for example `create`, `update`, `search` etc, or a specialized operation such as `import`.
- "id" is any identification data that needs to be supplied for the operation, for example a contact Id

## Authentication.

Except for calls to the `/auth` and '`/class` paths, all calls from a client must contain the voyzu session cookie from the client (this is browser default behaviou).  This session cookie is used to authenticate calls.  If no session cookie is passed, or the session cookie is invalid, then a 401 Unauthorised response will be returned.  When using the voyzu development server a session Id can be passed in the query string instead of a session cookie. All API calls are made in the context of the session user and the user's Customer domain.

## Http verb

Apart from calls to the `/class` operation, all http calls to the Voyzu CRM API are made using `POST`

## Making an API request.

To interact with the voyzu CRM API submit an authorized POST request to the desired API endpoint.  Refer to the table below for a list of end points.  If data is required to be submitted then the data must be an instance of the required javascript class.  If data is returned it will be an instance of the javascript class specified in the table below.

## Asynchronous Invocation

To invoke an API asynchronously add the "async" parameter to the query string.  For example `/api/contacts/search?async=true`.  You can then poll the request for completion by supplying the request Id to the `/request/get/{requestId}` path.  Use the `request-poller` javascript class contained in `voyzu-crm-webpage` to do this polling as it abstracts away much of the complexity.

## List of HTTP Response Codes

- **200 OK**  Returned for all successful requests
- **400 Bad Request** The client supplied data in an incorrect format.  Check you have supplied a valid {id} and/or a valid instance of the required javascript class. 400 responses can be expected to contain an `ErrorMessage` property in the response.

    Note that requests to update non-existant resources will return this code.  For example, you are trying to update a contact by posting to /contacts/update/{contactId} but you supply a non-existant contactId.  You will receive a 400 error (i.e. not a 404) .  Requests to delete resources will always succeed, regarless of whether the entity exists

- **401 Unauthorized** The request is not authorised.  Check you are supplying a valid SessionId e.g. in the cookie posted with the page
- **402 Payment Required** The request is for a resource or operation that requires a paid voyzu subscription
- **404 Not Found** The API endpoint cannot be found.  Check you have entered a valid endpoint and that you are using the correct HTTP verb
- **540 (Custom)** A voyzu error occurred fulfilling the request.  Generally 540 responses can be expected to contain an `ErrorMessage` property in the response.
- **541 (Custom)** A voyzu router error occurred fulfilling the request.  Generally 541 responses can be expected to contain an `ErrorMessage` property in the response.

- **500 Internal Server Error**  Voyzu logic will never deliberately return any 500 error, other than 540 or 541 codes.  So if a 500 response is returned this indicates that something has gone wrong in an un-anticipated way (e.g. a problem at the AWS layer)

### Consuming HTTP Errors

Where an HTTP request fails, and an ErrorMessage is returned, then this error message should never contain any sensitive information (e.g. stack traces).  The message will not be in a format that a client would understand, so this message should never be presented to the user (i.e. shown to the UI).  It is recommended you console.error out any ErrorMessages returned, and display a generic "something has gone wrong, please try again" type message to the client.

## List of API Operations

A list of all supported voyzu CRM endpoints follows.  If the Input Class column is blank this means that no input beyond what is contained in the path and the user's session is required to be posted.  Similarly if the output column is blank this means that no output will be returned, other than an HTTP response code.

### /api/auth

| Path                                                   | HTTP | Input Class                | Output class                 | Comments                                    |
| ------------------------------------------------------ | -----| ---------------------------|----------------------------- | ------------------------------------------- |
| /auth/class                                            | GET  |                            |                              | Outputs a plain text javascript module      |
| /auth                                                  | POST | AuthInput                  | Auth                         | Auth contains a 'SessionId' attribute       |

### /contacts

| Path                                                   | HTTP | Input Class                | Output class                 | Comments                                    |
| ------------------------------------------------------ | -----| ---------------------------|----------------------------- | ------------------------------------------- |
| /contacts/class                                        | GET  |                            |                              | Outputs a plain text javascript module      |
| /contacts/search                                       | POST | ContactsSearchInput        | ContactsDatatable?           |                                             |
| /contacts/delete/{id}                                  | POST |                            |                              |                                             |
| /contacts/update/{id}                                  | POST | WebContact?                | none?                        |                                             |
| /contacts/create                                       | POST | WebContact?                | WebContact?                  | WebContact contains an 'Id' attribute       |
| /contacts/get/{id}                                     | POST |                            | WebContact                   |                                             |

### /api/custom-fields

| Path                                                   | HTTP | Input Class                | Output class                 | Comments                                    |
| ------------------------------------------------------ | -----| ---------------------------|----------------------------- | ------------------------------------------- |
| /custom-fields/class                                   | GET  |                            |                              | Outputs a plain text javascript module      |
| /custom-fields/update                                  | POST | CustomFieldInput           |                              |                                             |

### /api/exports

### /api/imports

### /api/spreadsheets

| Path                                                   | HTTP | Input Class                | Output class                 | Comments                                    |
| ------------------------------------------------------ | -----| ---------------------------|----------------------------- | ------------------------------------------- |
| /spreadsheets/class                                    | GET  |                            |                              | Outputs a plain text javascript module      |
| /spreadsheets/list                                     | POST |                            |                              | lists spreadsheets for the session user     |


### /api/users

| Path                                                   | HTTP | Input Class                | Output class                 | Comments                                    |
| ------------------------------------------------------ | -----| ---------------------------|----------------------------- | ------------------------------------------- |
| /users/class                                           | GET  |                            |                              | Outputs a plain text javascript module      |
| /users/update-notification/{id}                        | POST | UserNotificationInput      |                              |                                             |
| /users/update-sharing                                  | POST | UserSharingInput           |                              |                                             |

