# XSS Exfiltration Server

This server is designed to receive and store keypresses and credentials from potential victims via cross-site (XSS) attacks. It leverages Excpress.js and an in-memory SQLite database to capture and organize the intercepted data. Also included is a dashboard to review stored data. It is explicitly created as a tool for educational purposes aimed at completing challenges for sites like HackTheBox and OffSec Proving Grounds.

**Disclaimer**: This tool is intended STRICTLY for educational and research purposes. It should only be used in controlled environments, with explicit permissions. Unauthorized use is strictly prohibited. Users are responsible for their actions.

## Features

1.  **Keypress logger**: Captures keypresses by victim IP.
2.  **Password stealer**: Captures usernames and passwords.
3.  **Dashboard**: Displays and organizes all recorded keypresses and credentials.

## Installation

```sh
npm install
```

## Usage

1.  Start the server:

    ```sh
    npm run start
    ```

2.  The server will be available at `http://0.0.0.0:8081`.
3.  Use the server routes:

    - `/`: Returns "Hello, world!".
    - `/keys?k=<KEY>`: Insert or update the keypress for a given IP.
    - `/credentials?u=<USERNAME>&p=<PASSWORD>`: Capture and log provided username and password.
    - `/dashboard`: Fetch all recorded keypresses by IP.

## Payloads

In the **payloads** foler, you'll find a collection of arbitrary scripts that are designed to demonstrate how data exfiltration might be achieved from vulnerable web pages.

**Usage**:

1.  Modify the target URL within the script to point to your server.
2.  Inject the modified script into a controlled, test website.

## Contribution Guide

npx eslint index.js [--fix]

## Final Disclaimer

Use this tool responsibly and ethically. Remember, understanding and demonstrating these vulnerabilities is a step towards building a safer internet. Always seek permission and always act with integrity.