import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { AppContext } from '../../app-context';
import { AuthRepository } from '../../repositories/web-api/auth-repository';

export type LogoutViewProps = {
  appContext: AppContext
};

export const LogoutView: React.FC<LogoutViewProps> = ({ appContext }) => {

  const authRepository = appContext.getRepository(AuthRepository) as AuthRepository;

  const navigate = useNavigate();

  useEffect(() => {

    const logout = async () => {
      await authRepository.logout();
      navigate('/login');
    };

    logout();
  }, [])


  return (
    <View>
    </View>
  );
};