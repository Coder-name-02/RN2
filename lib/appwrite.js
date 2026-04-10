import {Client,Storage} from "react-native-appwrite"

const client=new Client()

client
.setEndpoint("YOURENDPOINT")
.setProject ("YOURPROJECT_ID")

export const storage=new Storage(client)
export const BUCKET_ID="YOURBUCKET_ID"
