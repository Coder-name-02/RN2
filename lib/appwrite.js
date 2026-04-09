import {Client,Storage} from "react-native-appwrite"

const client=new Client()

client
.setEndpoint("https://sgp.cloud.appwrite.io/v1")
.setProject ("69bf9eac00097f4b1448")

export const storage=new Storage(client)
export const BUCKET_ID="69bf9f2a001d9d2f9846"