import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/auth-repository';

export type HomeViewProps = {
  appContext: AppContext
};

export const HomeView: React.FC<HomeViewProps> = ({ appContext }) => {

  const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

  const navigate = useNavigate();

  useEffect(() => {

    const checkLogged = async () => {
      if(!await authRepository.isLogged()) {
        navigate('/login');
      }
    };

    checkLogged();
  }, [])
  

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Inicio</Text>
      <Link to='/devices'><Text>Mis dispositivos</Text></Link>
      <Link to='/logout'><Text>Logout</Text></Link>
    </View>
  );
};