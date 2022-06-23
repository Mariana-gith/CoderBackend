
import admin from "firebase-admin"
import fs from 'fs'

const serviceAccount = JSON.parse(fs.readFileSync("./db/normalizr-dffd7-firebase-adminsdk-mrnge-d08dd18f70.json","utf-8"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default configfire