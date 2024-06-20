import { Button, Text, View, StyleSheet, SafeAreaView} from "react-native";
import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()


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

function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [error, setError] = useState("no error");

  const fetchTodos = async () => {
    const { data: items, errors } = await client.models.Todo.list();
    setTodos(items);
    if (errors) {
      if (errors[0])
        setError(errors[0].message)
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    await client.models.Todo.create({
      content: "hi",
    },
    {
      authMode: 'userPool',
    }
  )
    setError("no error")
    fetchTodos();
  }

  return (
    <View style={styles.signOutButton}>
    <Button title="Create Todo" onPress={createTodo} />
    <Text>{todos.length}</Text>
      {todos.map(({ id, content }) => (
          <Text key={id}>{content}</Text>
        ))}
          <Text>{error}</Text>
    </View>
  )
}

export default function Index() {
    const { user } = useAuthenticator((context) => [context.user]);

  return (
    <SafeAreaView
    >
        <Text>{user.userId}</Text>
        <Text>{user.username}</Text>
        <Text>{user.signInDetails?.loginId}</Text>
        <Text>{user.signInDetails?.authFlowType}</Text>
        <TodoList/>
        <SignOutButton />
    </SafeAreaView>
  );
}
