# Contact form → Google Sheet + email alert

`Code.gs` receives the website's contact form, adds each enquiry as a row in a Google Sheet, and emails the team. This folder is kept in the repo for safekeeping; it isn't published on the website.

## Setup (about 10 minutes, once)

1. Signed in as **udit.thapa@socialarrow.media**, create a new Google Sheet named **Social Arrow – Website enquiries**.
2. In the sheet: **Extensions › Apps Script**. Delete the sample code, paste all of `Code.gs`, click **Save**.
3. At the top, pick the function **setup** and click **Run**. Approve the permission prompt (if you see "Google hasn't verified this app", click **Advanced › Go to project**). An **Enquiries** tab with headers appears in the sheet.
4. Click **Deploy › New deployment**, choose type **Web app**, and set:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
5. In the website's `script.js`, paste that URL into `FORM_ENDPOINT` at the top. Commit, and the site redeploys.
6. Send a test enquiry from the live site. Check the sheet and your inbox.

## Changing things later

- **Who gets alerts:** edit `NOTIFY_EMAILS` at the top of the script (comma-separated).
- **After any code change** you must publish a new version, or the website keeps using the old one: **Deploy › Manage deployments › ✏️ Edit › Version: New version › Deploy**. The URL stays the same.

## Tracking leads

Use the **Status** column (New → Contacted → Proposal → Won / Lost) and **Notes** for follow-ups. Adding a Data validation dropdown on the Status column makes it quicker.

## Troubleshooting

- **"Anyone" isn't offered in step 4:** your Google Workspace admin is restricting sharing outside socialarrow.media. In admin.google.com, allow Apps Script web apps to be shared with anyone (Drive and Docs sharing settings), or deploy from a personal Gmail account instead.
- **Form says "not sent":** open the Web app URL in a browser. It should say the endpoint is running. If it asks you to sign in, "Who has access" isn't set to Anyone.
