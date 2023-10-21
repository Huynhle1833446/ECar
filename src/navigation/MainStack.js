import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainHome from '../screens/MainHome';
import CreateRoute from '../screens/CreateRoute';
import FindRoute from '../screens/FindRoute';
import AccountManagement from '../screens/AccountManagement';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ScaleUtils from '../utils/ScaleUtils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (
    <Stack.Navigator initialRouteName='homeStack'>
        <Stack.Screen options={{ headerShown: false }} name='homeStack' component={BottomTab} />
    </Stack.Navigator>
)
const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="home"
            tabBarOptions={{
                activeTintColor: '#FF6260',
                labelStyle: {
                    fontSize: ScaleUtils.floorModerateScale(13),
                    fontWeight: "bold"
                }
            }}>
            <Tab.Screen
                name="home"
                component={MainHome}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name={'home'}
                            size={25}
                            color={focused ? "#FF6260" : "#C8C8C8"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="findRoute"
                component={FindRoute}
                options={{
                    tabBarLabel: 'Tìm tuyến',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name={'location-arrow'}
                            size={20}
                            color={focused ? "#FF6260" : "#C8C8C8"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="createRoute"
                component={CreateRoute}
                options={{
                    tabBarLabel: 'Tạo tuyến',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name={'route'}
                            size={20}
                            color={focused ? "#FF6260" : "#C8C8C8"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="accountView"
                component={AccountManagement}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name={'user-alt'}
                            size={20}
                            color={focused ? "#FF6260" : "#C8C8C8"}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default MainStack;