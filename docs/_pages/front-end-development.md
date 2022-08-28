---
permalink: /front-end-development/
title: "Front end development"
layout: single
sidebar:
  nav: "sidebar"
toc: true
---
### Overview

Voyzu uses a template system, pages are written in HTML, CSS and Javascript.  At run time (i.e. when the browser navigates to the voyzu web application and requests a page) this template is read and served as a live web page.  What makes the voyzu front-end development system powerfull is that these template files are also designed to render on your local development machine - served by any web server capable of serving static content on your local machine (see section below on this).

### Plain JS only

Voyzu web page templates, and web components are written using plain HTML, CSS and Javascript.  A framework (e.g. React, Angular etc) is not used.  There is no 'compile' step, so TypeScript is not used.  Simply write functionality using plain, vanilla Javascript :-)  Microsoft Internet Explorer is not supported, so modern Javascript (ES6) can be used.  The `/contacts/index.html` template page is fully complete and is a very useful resource to look at to see the various patterns in use.

### Running the site on your development machine

To run the web application on your local machine first make sure python is installed on your machine.  Python is required to power the very simple local http server - nothing else.  Double click `server.cmd` - this will launch a simple http server, using the files in this folder as web pages.  Navigate to `http://localhost:8000/contacts/` - you should see the voyzu web application, with contacts displayed in a grid.  Note - this functionality has only been tested on Windows 10.

The local web host structure follows the folder structure.  So a local URL like `http://localhost:8000/my-page/` can be expected to work if there is a folder named `my-page` sitting in the root directory, containing a page named `index.html`.  The data displayed on the site comes from data contained in a `mock.json` file and also from the Voyzu development server (see later sections on this).

When a page is served on localhost and not in the production environment, the page will fall back to using mock data to display all data that is not obtained dynamically from the development server.  This includes values such as the user name.  Mock data is contained in a file named `mock.json` which sits as a peer to the `index.html` page.  You can change values in `mock.json` for testing purposes.  Note that the `userEmail` value of `mock.json` must match an actual user on the voyzu server.

### Dynamic elements are contained within web components

Voyzu front end development uses [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - this ensures that functionality is encapsulated and also supports component re-use. Static elements, such as the page header can stand alone, but all dynamic elements (elements that can change depending on context) must be contained within a web component.  As an example of this, see the contacts template - this contains three web components: an "action-bar" web component holding the top row of buttons, a "datatable-search-bar" web component containing the search input box and an "mdb-datatable-wrapper" web component which contains the data table display logic.

### Shared web components

Web components that are shared accross the application are contained in the `/public/web-components` folder.  These can be used in the standard way:
- a script reference to the web component must be placed on your page. E.g. `<script type="text/javascript" src="/public/web-components/side-nav.js"></script>`
- the web component tag must be used in your html page.  E.g. `<side-nav></side-nav>`
- the component must be registered. E.g. `customElements.define('side-nav', SideNav)`

A list of shared web components, with a brief description of each follows:

#### app-alert

Placing the `<app-alert target-id="page-alert"></app-alert>` web component tag allows you to to call the `AppAlert.ShowAlert(...)` method to show a themed alert in the position the app-alert tag appears.  Multiple alerts (e.g. a page alert and an alert on a modal pop-up) are supported by specifying a different `id` property on the app-alert tag, and supplying this id value to the `AppAlert.ShowAlert(...)` method.

#### help-panel

Placing the `<help-panel></help-panel>` web component tag on a page allows you to display help on a sliding side bar.  The help content displayed is the content of the `<template id="help-content-template">` element.  This component listens for the `show-help-checkbox` custom event, which is emitted by the top-nav web component.

#### side-nav

The `<side-nav>` web component holds the site navigation.  You can control which menu item and sub-menu item is displayed as active by passing page data to the page - as `activeMenuItem` and `activeSubMenuItem`.  This component can also be rendered server side, which is the reason for the \{{ type comments (these are replaced dynamically when rendered by the Voyzu server), and the reason also that the component does not use any DOM manipulation

#### top-nav

The `<top-nav>` web component displays the top most navigation bar.  It is configured dynamically by pageData values.  This component can also be rendered server side, which is the reason for the  type comments, and the reason also that the component does not use any DOM manipulation

### Communicating between web components

When one web component needs to receive input from a separate web component, or needs to display data on an other web component, then there are two ways to achieve this.
1. Web Component A raises a custom event, Web Component B listens for this event, and takes action when the event is received
2. Web Component A calls a public method of Web Component B

In general method one - raising a custom event is preferred as this communication is more loosely coupled.  However for very simple functions like displaying text, then option 2, calling a public method can be used.  The contacts template uses both methods.

### Calling the voyzu CRM API

As with any web client / server application Voyzu makes calls to an API, hosted by Voyzu, to retrieve and update data.  Template pageData includes a `baseUrl` value, which is the base server address that voyzu uses to communicate with.  Combine this value with the relivant API path to obtain the URL to call.  See [api-documentation](/api-documentation/) for a full list of URLs to call, as well as more information on communicating with the voyzu CRM API.

To make API calls use the voyzu utility `FetchHelepr`, which is contained in `/public/js/fetch-helper.js`.  This class contains a `post(...)` method which returns a `FetchHelperResponse` object.  See the contacts template for examples of how to use FetchHelper

All voyzu API calls use classes to send and receive information.  This class serves as a contract between client and server.  So for example to search for contacts you instantiate a `ContactsSearch` class and pass it to the `/api/contacts/search` API.  This API performs the search and passes back a instance of the `ContactsSearchResult` class.  Obtaining class definitions does not require authentication - for example you can see the classes we have referred to [here](https://crm-dev.voyzu.com/api/contacts/class).  See the `populateDatatable` private method in the contacts template for this example in operation.

### Asynchronous requests (polling)

Some API calls start other, longer running processes.  For example deleting a contact will delete the Voyzu contact and return a response.  In the background a process will also be kicked off which will delete the contact from Google contacts for all users participating in replication.  Other API calls may not be able to be completed within 30 seconds (the AWS API Gateway limit) and so need to be fulfilled asynchronously.  In both cases you can poll these asynchronous requests by making use of `RequestPoller` utility (`/public/js/request-poller.js`).  

Initiate RequestPoller as follows:

````
                let requestPollerUrl = pageData.baseUrl + '/api/request-status/get/{requestId}'
                if (pageData.voyzuSessionId) {
                    requestPollerUrl += '?voyzu-session-id=' + pageData.voyzuSessionId
                }

                const requestPoller = new RequestPoller(requestPollerUrl)
````

Then attach methods to the `onFail` and `onProcessed` and optionally the `onTick` events.  All these events will pass a `RequestStatus` item, which you can use to display progress to the user, and to notify the user of process completion.  An example RequestStatus item is below

```
{
    "RequestId": "XkbeRjJDoAMEVrw=",
    "Commentary": "Workflow complete",
    "PercentComplete": 100,
    "ProcessStatus": "PROCESSED",
    "CreatedDate": "2022-08-28T10:12:31.530Z",
    "UpdatedDate": "2022-08-28T10:12:41.599Z"
}
```

To see an example of the RequestPoller in use see the `connectedCallback` method of the `ActionBar` web component.  


