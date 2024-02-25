import { BrowserWindow } from "electron";
import http from "http";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

const createServer = (mainWindow: BrowserWindow) => {
  const port = 9017;
  const server = http.createServer();
  const wss = new WebSocket.Server({ server });

  const clientDataMap = new Map();

  wss.on("connection", (ws) => {
    try {
      const clientId = uuidv4();

      // Make sure query debugger window is clean
      mainWindow.webContents.send("query-data", []);

      ws.on("message", (message: string) => {
        try {
          const data = JSON.parse(message);

          if (!Array.isArray(data)) return;

          clientDataMap.set(clientId, data);

          mainWindow.webContents.send(
            "query-data",
            data.sort((a, b) => {
              // If dataUpdatedAt has zero observers, prioritize it last
              if (a.observers === 0 || b.observers === 0) {
                return a.observers === 0 ? 1 : -1;
              }

              // Sort by dataUpdatedAt in descending order
              if (a.dataUpdatedAt !== b.dataUpdatedAt) {
                return b.dataUpdatedAt - a.dataUpdatedAt;
              }

              // For objects with non-zero observers, sort them in descending order of observers
              return b.observers - a.observers;
            })
          );
        } catch (error) {
          console.warn(error);
        }
      });

      ws.on("close", () => {
        clientDataMap.delete(clientId);
      });
    } catch (error) {
      console.error("Error in server", error);
    }
  });

  server.on("request", (req, res) => {
    if (req.method === "POST" && req.url === "/close") {
      // Close connection with clients
      wss.clients.forEach((client) => {
        client.close();
      });

      // Close server
      server.close();
      res.end("Server closed.");

      console.info(`Query Debugger Tool server closed`);
    }
  });

  //start server
  server.listen(port, () => {
    console.info(`Query Debugger Tool listening on port: ${port}`);
  });
};

export default createServer;
