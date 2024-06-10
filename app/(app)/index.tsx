import { Button, Text, View, StyleSheet, SafeAreaView} from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: "flex-end",
  },
});

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default function Index() {
    const { user } = useAuthenticator((context) => [context.user]);

  return (
    <SafeAreaView
    >
        <Text>{user.userId}</Text>
        <Text>{user.username}</Text>
        <Text>{user.signInDetails?.loginId}</Text>
        <Text>{user.signInDetails?.authFlowType}</Text>
        <SignOutButton />
    </SafeAreaView>
  );
}
