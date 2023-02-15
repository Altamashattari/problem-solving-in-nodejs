import * as http from 'http';
import * as fs from 'fs';

const fileUploader = () => {
    const server = http.createServer();

    server.on('listening', () => console.log("listening..."));

    server.on('request', (req, res) => {
        if (req.url === '/') {
            res.end(fs.readFileSync("src/file-uploader/index.html"));
            return;
        }

        if (req.url === "/upload") {
            const fileName = req.headers["file-name"] as string;
            req.on('data', chunk => {
                console.log(`received chunk of size ${chunk.length}`);
                fs.appendFileSync(fileName, chunk);
            });
            res.end("uploaded");
        }
    });

    server.listen("8080");
}

export default fileUploader;

/*

- Add retry in case of failure
- Write chunk to blob table instead of server so that in case of multiple server, chunk should not get corrupted. we need to keep it stateless
 */