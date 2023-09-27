import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Scope2 } from "./Scope2";
import { Graphs } from "./Graphs";
import { WelcomeScreen } from "./WelcomeScreen";
import { Infos } from "./Infos";
import { EndAi } from "./EndAi";
import { Solution } from "./Solution";

const Stack = createNativeStackNavigator()

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen">
                <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" options={{headerShown: false}} />
                <Stack.Screen component={Infos} name="Infos" options={{headerShown: false}} />                
                <Stack.Screen component={Scope2} name="Scope2" options={{headerShown: false}} />
                <Stack.Screen component={Graphs} name="Graphs" options={{headerShown: false}} />
                <Stack.Screen component={EndAi} name="EndAi" options={{ headerShown: false }} />
                <Stack.Screen component={Solution} name="Solution" options={{ headerShown: false }} />                
            </Stack.Navigator>
        </NavigationContainer>
    )
}