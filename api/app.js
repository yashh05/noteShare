const express = require("express");
const app = express();
const dbConnect = require("./controller/dbConnect");
const fileRouter = require("./router/fileRouter");
const { findOrCreateDocument } = require("./controller/fileController");
const authRouter = require("./router/authRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const File = require("./models/fileModel");

app.use(
  "*",
  cors({
    origin: "https://note-share-gamma.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

dbConnect();
app.use(authRouter);
app.use("/files", fileRouter);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log("server is connected");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "https://note-share-gamma.vercel.app",
    method: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("get-document", async ({ userId, documentId }) => {
    const document = await findOrCreateDocument(userId, documentId);
    console.log(document);
    if (document) {
      // console.log(document);
      socket.join(documentId);
      socket.emit("load-document", document.fileData);
    }

    socket.on("send-changes", (delta) => {
      // console.log(`delta ${JSON.stringify(delta)}`);
      socket.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      const result = await File.findByIdAndUpdate(documentId, {
        fileData: data,
      });
      if (result) {
        // console.error(`${result}`);
      }
    });
  });
});

// io.on("connection",socket=>{
//   socket.on("send-changes",delta=>{
//     socket.broadcast.emit('recieve-changes',delta)
//   })
// })
