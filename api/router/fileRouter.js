const Router = require("express").Router;

const {
  createFile,
  getFile,
  deleteFile,
  giveAcessFile,
  removeAcessFile,
} = require("../controller/fileController");
const router = Router();

router.post("/createfile", createFile);
router.post("/getfiles", getFile);
router.delete("/deletefile", deleteFile);
router.post("/giveaccess",giveAcessFile );
router.post("/removeaccess",removeAcessFile);
module.exports = router;
