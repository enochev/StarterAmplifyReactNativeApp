import { Slot } from "expo-router";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react-native";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

export default function RootLayout() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <Slot/>
      </Authenticator>
    </Authenticator.Provider>
  );
}
