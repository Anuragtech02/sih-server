import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

const servicesAccount = {
  type: process.env.SERVICES_TYPE,
  project_id: process.env.SERVICES_PROJECT_ID,
  private_key_id: process.env.SERVICES_PRIVATE_KEY_ID,
  private_key: process.env.SERVICES_PRIVATE_KEY,
  client_id: process.env.SERVICES_CLIENT_ID,
  client_email: process.env.SERVICES_CLIENT_EMAIL,
  auth_uri: process.env.SERVICES_AUTH_URI,
  token_uri: process.env.SERVICES_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SERVICES_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.SERVICES_CLIENT_CERT_URL,
};

const temp = {
  projectId: process.env.SERVICES_PROJECT_ID,
  clientEmail: process.env.SERVICES_CLIENT_EMAIL,
  privateKey: process.env.SERVICES_PRIVATE_KEY,
};
admin.initializeApp({
  credential: admin.credential.cert(temp),
});

export default admin;
