import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainHome from '../screens/MainHome';
import CreateRoute from '../screens/CreateRoute';
import FindRoute from '../screens/FindRoute';
import map from '../screens/map';
import AccountManagement from '../screens/AccountManagement';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ScaleUtils from '../utils/ScaleUtils';
import HistoryBooking from '../screens/HistoryBooking';
import TicketDetail from '../screens/TicketDetail';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import StartJourney from '../screens/StartJourney';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainStack = () => (
    <Stack.Navigator initialRouteName='homeStack'>
        <Stack.Screen options={{ headerShown: false }} name='homeStack' component={BottomTabForUser} />
        <Stack.Screen options={{ headerShown: false }} name='findRoute' component={FindRoute} />
        <Stack.Screen options={{ headerShown: false }} name='createRoute' component={CreateRoute} />
        <Stack.Screen options={{ headerShown: false }} name='ticketDetail' component={TicketDetail} />
        <Stack.Screen options={{headerShown : false}} name='startJourney' component={StartJourney}/>
        <Stack.Screen options={{ headerShown: false }} name='map' component={map} />
    </Stack.Navigator>
)
const BottomTabForUser = () => {
    const { userInfo } = useSelector(selectAuth)

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
                    tabBarLabel: userInfo['role'] == "staff" ? 'Lịch trình' : 'Trang chủ',
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
                name="history"
                component={HistoryBooking}
                options={{
                    tabBarLabel: userInfo['role'] == "staff" ? 'Lịch sử chuyến đi' : 'Lịch sử mua vé',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name={'history'}
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
// const BottomTabForDriver = () => {
//     return (
//         <Tab.Navigator
//             initialRouteName="home"
//             tabBarOptions={{
//                 activeTintColor: '#FF6260',
//                 labelStyle: {
//                     fontSize: ScaleUtils.floorModerateScale(13),
//                     fontWeight: "bold"
//                 }
//             }}>
//             <Tab.Screen
//                 name="home"
//                 component={MainHome}
//                 options={{
//                     tabBarLabel: 'Lịch trình',
//                     tabBarIcon: ({ focused }) => (
//                         <FontAwesome5
//                             name={'home'}
//                             size={25}
//                             color={focused ? "#FF6260" : "#C8C8C8"}
//                         />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="history"
//                 component={HistoryBooking}
//                 options={{
//                     tabBarLabel: 'Lịch sử chuyến đi',
//                     tabBarIcon: ({ focused }) => (
//                         <FontAwesome5
//                             name={'history'}
//                             size={20}
//                             color={focused ? "#FF6260" : "#C8C8C8"}
//                         />
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="accountView"
//                 component={AccountManagement}
//                 options={{
//                     tabBarLabel: 'Tài khoản',
//                     tabBarIcon: ({ focused }) => (
//                         <FontAwesome5
//                             name={'user-alt'}
//                             size={20}
//                             color={focused ? "#FF6260" : "#C8C8C8"}
//                         />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// }
export default MainStack;