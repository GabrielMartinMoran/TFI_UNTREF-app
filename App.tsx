import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { AppContext } from './src/app-context';
import { DeviceView } from './src/components/views/DeviceView';
import { HomeView } from './src/components/views/HomeView';
import { LoginView } from './src/components/views/LoginView';
import { LogoutView } from './src/components/views/LogoutView';
import { MyDevicesView } from './src/components/views/MyDevicesView';
import { RegisterView } from './src/components/views/RegisterView ';

export default function App() {

  const appContext = new AppContext();


  return (
    <NativeRouter>
      <Routes>
        <Route path='/' element={<HomeView appContext={appContext} />} />
        <Route path='/login' element={<LoginView appContext={appContext} />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/logout' element={<LogoutView appContext={appContext} />} />
        <Route path='/devices' element={<MyDevicesView appContext={appContext} />} />
        <Route path='/devices/:deviceId' element={<DeviceView appContext={appContext} />} />



        <Route path='*' element={<HomeView appContext={appContext} />} />
      </Routes>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
