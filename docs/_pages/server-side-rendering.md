---
permalink: /server-side-rendering/
title: "Server side rendering"
layout: single
sidebar:
  nav: "sidebar"
toc: true
---

<script>
  alert ('hello')
</script?
  
### Overview

As described in [front end development](/front-end-development/) voyzu uses a template system to render web application pages.  So when a user browses to a voyzu web app url the page template (named `index.html`) is read, run time values injected, and then returned to the user.  This documentation page describes this process in more detail.  Note - if you are developing functionality for voyzu purely on the client side, then it is not necessary to be familiar with this process, as voyzu template pages work almost identically when viewed as static files.

The process of rendering a voyzu web application is described here as a series of steps.  The `contacts` web page is used as an example but this process is the same for any web page

### 1. User browses to crm.voyzu.com/contacts

API Gateway will receive this request...
