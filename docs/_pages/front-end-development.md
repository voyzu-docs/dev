---
permalink: /front-end-development/
title: "Front end development"
layout: single
sidebar:
  nav: "sidebar"
toc: true
---
### Overview

Voyzu uses a template system, pages are written in HTML, CSS and Javascript.  At run time (i.e. when the browser navigates to the voyzu web application and requests a page) this template is read and served as a live web page.  What makes the voyzu front-end development system powerfull is that these template files are also designed to render on your local development machine - served by any web server capable of serving static content on your local machine (see section below on this)

### Plain JS only

Voyzu web page templates, and web components are written using plain HTML, CSS and Javascript.  A framework (e.g. React, Angular etc) is not used.  There is no 'compile' step, so TypeScript is not used.  Simply write functionality using plain, vanilla Javascript :-)  Microsoft Internet Explorer is not supported, so ES6 can be used.  The `/contacts` template page is fully complete and is a very useful resource to look at to see the various patterns in use.

### Running the site on your development machine

To run the web application on your local machine first make sure python is installed on your machine.  Python is required to power the very simple local http server - nothing else.  Double click `server.cmd` - this will launch a simple http server, using the files in this folder as web pages.  Navigate to `http://localhost:8000/contacts/` - you should see the voyzu web application, with contacts displayed in a grid.  Note - this functionality has only been tested on Windows 10.

The local web host structure follows the folder structure.  So a local URL like `http://localhost:8000/my-page/` can be expected to work if there is a folder named `my-page` sitting in the root directory, containing a page named `index.html`.  The data displayed on the site comes from data contained in a `mock.json` file and also from the Voyzu development server (see later sections on this).

When a page is served on localhost and not in the production environment, the page will fall back to using mock data to display all data that is not obtained dynamically from the development server.  This includes values such as the user name.  Mock data is contained in a file named `mock.json` which sits as a peer to the `index.html` page.  You can change values in `mock.json` for testing purposes.  Note that the `userEmail` value of `mock.json` must match an actual user on the voyzu server.

### Dynamic site elements are contained within web components

Voyzu front end development uses [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - this ensures that functionality is encapsulated and also enables component re-use.  Web components that are shared accross the application are contained in the `/public/web-components` folder.  These are used in the standard way:
- a script reference to the web component must be placed on your page
- the web component tag must be used
- the component must be registered

### Shared web components

lorem ipsum



## Communicating between web components

lorem ipsum

### Calling the voyzu CRM API

lorem ipsum

### Asynchronous requests (polling)

lorem ipsum
