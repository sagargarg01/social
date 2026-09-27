/**
 * Social Arrow — website enquiry handler (Google Apps Script)
 *
 * Saves every contact-form submission as a row in this Google Sheet
 * and emails a notification to the team.
 *
 * Setup: see apps-script/README.md in the repo.
 */

// ---- Settings ---------------------------------------------------------------
// Who gets the email alert. Add more addresses separated by commas.
const NOTIFY_EMAILS = 'udit.thapa@socialarrow.media';
const SHEET_NAME = 'Enquiries';
const TIMEZONE = 'Asia/Kolkata';
// -----------------------------------------------------------------------------

const HEADERS = [
  'Submitted at', 'Name', 'Email', 'Company / brand', 'Target city / region',
  'Monthly budget', 'Services', 'Message', 'Status', 'Notes'
];

/** Run this once from the Apps Script editor to create the sheet and grant permissions. */
function setup() {
  getSheet_();
  MailApp.getRemainingDailyQuota(); // triggers the email permission prompt
}

/** Receives the website form (POST). */
function doPost(e) {
  const p = (e && e.parameter) || {};

  // Spam trap: real visitors never see or fill the hidden "website" field.
  if (p.website) return json_({ ok: true });

  const name = clean_(p.name, 120);
  const email = clean_(p.email, 200);
  // The "email" field now carries a mobile number (the website asks for mobile).
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhone = /^\+?[0-9\s-]{10,16}$/.test(email);
  if (!name || !(isEmail || isPhone)) {
    return json_({ ok: false, error: 'Please enter your name and a valid mobile number.' });
  }

  const row = {
    submittedAt: Utilities.formatDate(new Date(), TIMEZONE, 'dd MMM yyyy, HH:mm'),
    name: name,
    email: email,
    company: clean_(p.company, 200),
    region: clean_(p.region, 200),
    budget: clean_(p.budget, 60),
    services: clean_(p.services, 300),
    message: clean_(p.message, 5000)
  };

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet_().appendRow([
      row.submittedAt, row.name, row.email, row.company, row.region,
      row.budget, row.services, row.message, 'New', ''
    ]);
  } finally {
    lock.releaseLock();
  }

  try {
    sendAlert_(row);
  } catch (err) {
    console.error('Email alert failed: ' + err); // the row is still saved
  }

  return json_({ ok: true });
}

/** Lets you open the web app URL in a browser to confirm it's live. */
function doGet() {
  return json_({ ok: true, message: 'Social Arrow form endpoint is running.' });
}

// ---- Helpers ----------------------------------------------------------------

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#EAE5DA');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(8, 360);
  }
  return sheet;
}

function sendAlert_(r) {
  const rows = [
    ['Name', r.name], ['Email', r.email], ['Company / brand', r.company],
    ['Target city / region', r.region], ['Monthly budget', r.budget],
    ['Services', r.services], ['Message', r.message], ['Received', r.submittedAt + ' IST']
  ];
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#15140F">' +
    '<h2 style="margin:0 0 12px">New website enquiry</h2>' +
    '<table cellpadding="8" style="border-collapse:collapse">' +
    rows.map(function (x) {
      return '<tr><td style="background:#F5F2EC;font-weight:bold;vertical-align:top">' + x[0] +
             '</td><td style="white-space:pre-wrap">' + escape_(x[1] || '—') + '</td></tr>';
    }).join('') +
    '</table>' +
    '<p style="margin-top:16px">Call or WhatsApp ' + escape_(r.name) + ' on the number above.</p>' +
    '<p><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">Open the enquiries sheet</a></p></div>';

  MailApp.sendEmail({
    to: NOTIFY_EMAILS,
    replyTo: r.email.indexOf('@') > -1 ? r.email : NOTIFY_EMAILS.split(',')[0], // mobile numbers can't be replied to
    name: 'Social Arrow website',
    subject: 'New enquiry: ' + r.name + (r.company ? ' (' + r.company + ')' : ''),
    htmlBody: html,
    body: rows.map(function (x) { return x[0] + ': ' + (x[1] || '—'); }).join('\n')
  });
}

function clean_(v, max) {
  let s = String(v || '').trim().slice(0, max);
  // Stop spreadsheet formula injection (values starting with = + - @)
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function escape_(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
