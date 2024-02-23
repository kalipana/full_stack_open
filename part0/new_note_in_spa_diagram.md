```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: POST request contains new note as JSON data containing the content of the note and the timestamp
    server-->>browser: Status code 201: created
    deactivate server