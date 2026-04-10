1.ADD YOUR OWN PROJECT_ID,ENDPOINT AND BUCKET_ID INSIDE THE < lib folder appwrite.js>

2.ADD YOUR OWN UNIQUE KEY FROM FIREBASE INSIDE THE <lib folder firebase.js>
  apiKey: "API_KEY",
  authDomain: " AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STROAGE_BUCKET",
  messagingSenderId: "ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID"


3. UPDATE THIS LINE BASE ON YOUR OWN ENDPOINT AND PROJECT INSIDE <Context folder ItemsContext.jsx>
  `https:///v1/storage/buckets/${BUCKET_ID}/files/${filedId}/view?project=projectId`
