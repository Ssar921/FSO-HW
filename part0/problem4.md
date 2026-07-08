sequenceDiagram
participant browser
participant server

    Note left of browser: User submits form

    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server

    Note left of server: The server creates a new note object but doesn't save it to the database

    server-->>browser: 302 Found URL Redirect to /notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the updated JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "New note content", "date": "2026-7-6" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the now updated notes
