## File Parser

File-parser is a tool that converts json/csv files into json string data.

### Setup

- `npm install` for installing dependencies.
- `npm start` to run server on local.

### Using JSON Parser from Frontend

```       const formData = new FormData();

        // Append the file to the FormData object
        formData.append("jsonFile", file);
        const response = await fetch("http://localhost:9000/api/parser/json", {
            method: "POST",
            headers: {
                "contentType":"multipart/form-data"
            },
            body: formData,
        });
```

