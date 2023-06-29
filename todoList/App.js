// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./Auth";
import TodoApp from "./TodoApp";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userName, password) => {
    const loggedInUser = { userName };
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="TodoApp">
            {(props) => (
              <TodoApp
                {...props}
                loggedInUser={user.userName}
                onLogout={handleLogout}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth">
            {(props) => <Auth {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
