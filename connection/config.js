
var admin = require("firebase-admin");

var serviceAccount = require("./project-a-a74f1-firebase-adminsdk-g3hm5-a62fe3171f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
 const db=admin.firestore();
 const Staffs=db.collection("Staffs");

 module.exports=Staffs;