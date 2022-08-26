---
permalink: /api-development/
title: "API development"
layout: single
sidebar:
  nav: "sidebar"
toc: true
---
## Development conventions

If you are creating new API endpoints the following conventions are followed:

### No heirachy

Some API conventions establish a heirachy with path segments later in the path being children of path segments earlier in the path.  For example a path like `customers/accounts/withdrawals/{id}` would signify that a withdrawal belongs to an account, which belongs to a customer.  Voyzu however employs a "flat" naming convention.  For example instead of `/contacts/exports/get/{id}` the path is `/exports/get/{id}`.  This is done so a standard path structure (`/api/resource/operation/{id}`) can be followed.  Also as voyzu CRM is a Contact Management System, the majority of objects would sit under `/contacts` anyway, making this convention a bit redundant.

### What is a "resource"?

Resource, in the context of API end points is best thought of as a logical part of the product.  It could also be called "Product Domain".  So a resource does not map one to one with a database table.  For example consider the API path `/api/custom-fields/update`.  This will update Custom Fields, which are stored in a Customer record.  However the logic will also iterate through all that customer's contacts, renaming the custom field as needed.  Finally a workflow job will be created which will update all Google Contacts as needed.  Again, consider the path `/api/auth` - this will check a user's credentials, authenticate against Google's authorization service, and create a session record upon authorization.  

### Naming conventions

#### Operation segment naming convention
- Create = Create a new resource.  The resource Primary Key is not expected to be supplied.  The primary key of the created resource should be returned in the response
- Delete = Delete an existing resource.  Returns 200 regardless of whether the resource existed or not
- Update = Update an existing resouce. Call will fail if resource does not exist.  If only part of the entity will be updated this can be indicated with a hypenated operation name, e.g. `/users/update-notification`  In this case whether or not the specific part of the entity being updated is present or null doesn't matter this is still an 'update'
- Upsert = Upsert. New resource will be created if resource does not exist, resource will be updated if it does exist
- Get = Get a single resource.  Call will fail if resource doesn't exist
- List.  List all resources associated with the authorized user (i.e. list is not expected to return all rows in the data table, just all the ones relivant to the context of the user)
- Search.  Use supplied parameters to search.  Note: no naming distinction is made between a simple search (sometimes called a 'filter') and a complex search
- Other operations should be given a simple, descriptive name.  e..g. "import", "export" etc

#### Sub-component naming

Sub-components are named as "resouce-operation", i.e. sub-component names will mirror the paths they serve.  This means that all 'resource-operation' combinations must be unique

