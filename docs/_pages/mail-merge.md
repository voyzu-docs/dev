---
permalink: /mail-merge/
title: "Mail merge to your shared contacts"
layout: single
sidebar:
  nav: "sidebar"
toc: true
---
Step by step instructions on how to perform a mail merge using a popular Google Workspace plug in, Yet Another Mail Merge

## 1.  Install Yet Another Mail Merge

Yet Another Mail Merge (YAMM) is a simple and popular mail merge tool for Gmail and Google Workspace. You can
<a target="_blank"
href="https://gsuite.google.com/u/0/marketplace/app/yet_another_mail_merge/52669349336">install
YAMM from the Google Workspace Marketplace</a>

YAMM has a free edition that allows you to send up to 50 emails per day, and paid plans
that allow up to 1500 emails to be sent
per day (the <a href="https://support.google.com/a/answer/166852?hl=en">Google Workspace
limit</a> is 2000 per day) starting at USD $28 per year


## 2.  Compose your email template as a draft

From within [Gmail](https://mail.google.com) click on 'Drafts' and compose a new email.
Compose the email template just as you would a regular email. To insert merge fields enclose fields double curly braces:
{% raw %} {{...}} {% endraw %} for example {% raw %} Dear {{First Name}} {{Last Name}} {% endraw %}

## 3.  Launch Yet Another Mail Merge and import contacts

Create a new Google Sheet or use an existing one, and on the top menu click Add ons > Yet Another Mail Merge > Import contacts

<img src="https://voyzu.com/img/screen_yamm_start.png">

Click the option to import Google Contacts ...

<img src="https://voyzu.com/img/screen_yamm_import.png">
  
... and import contacts from your #voyzu shared label

<img src="https://voyzu.com/img/screen_yamm_group.png">

## 4.  Filter rows (optional)

If you want to filter contacts,
e.g. to send  only to contacts with a certain type, or status, then click 'Data' > 'Create a
Filter', and filter columns by clicking on the funnel icon next to each column heading.

## 5. Send Emails
From the YAMM 'Start Mail Merge' screen select the email template you composed in a previous step in the 'Email Template'
field.

To send from one of your email aliases instead of your default email click the '+ Alias...'
link

Click to 'Receive a test email' and if you are happy with the test mail sent, click 'Send
emails' to begin your mail merge

<img  src="https://voyzu.com/img/merge_send.png" alt="">

## Pro tip: Set up email authentication
If you haven't done this already, now is a good time to set up email authentication for
your domain. This is important as without email authentication set up your mail merge emails risk going to your
contacts' spam folder. Emailauthentication or Domain Keys Identified Mail (DKIM) is a process whereby you prove that you own the
domain name you aresending email from.

To set up email authentication <a href="https://admin.google.com">log in to your Google Workspace admin console </a>and navigate to
"Applications" > "Google Workspace"> "Gmail" and click on "Authenticate email". If you haven't already set up email
authentication you will see a screen like the below

<img src="https://voyzu.com/img/screen_groups_email_auth.png" alt="">

If you purchased your domain as part of your Google Workspace set up then simply click on 'Start
Authentication' and Google Workspace will automatically do the rest. If not, you will need to insert some information into a
TXT record of your domain's DNS settings.
This process can be a little technical, however Google Workspace does provide on screen
instructions to help you.

Google provides an online tool that you can use to validate your Google Workspace outbound mail
setup at <a href="https://toolbox.googleapps.com/apps/checkmx/">
https://toolbox.googleapps.com/apps/checkmx/</a>


***Note:***

Voyzu is not associated with Yet Another Mail Merge in any way, we just like the product :)
