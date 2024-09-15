import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreenWidget from './Home';
import InsidePage from './InsidePage';
import Login from './Login';
import Register from './Register';
import TodoListPage from './ViewTodos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name = "HomeScreenWidget" component = {HomeScreenWidget} 
        options={{
          title: 'HOME', 
          headerStyle: {
            backgroundColor: 'lightskyblue', 
          },
        }}/>

        <Stack.Screen name = "Login" component = {Login}
        options={{
          title: 'Login', 
          headerStyle: {
            backgroundColor: 'lightskyblue',
          },
        }}/>

        <Stack.Screen name = "Register" component = {Register}
        options={{
          title: 'Register', 
          headerStyle: {
            backgroundColor: 'lightskyblue',
          },
        }}/>

        <Stack.Screen name="InsidePage" component={InsidePage}
          options={{
            title: 'InsidePage', 
            headerStyle: {
              backgroundColor: 'lightskyblue',
            },
            headerBackVisible: false,  
        }}/>

        <Stack.Screen name="TodoListPage" component={TodoListPage}
          options={{
            title: 'TodoListPage', 
            headerStyle: {
              backgroundColor: 'lightskyblue',
            },
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};