import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Image = styled.Image`
  width: 41;
  height: 42;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const Error = styled.Text`
  align-self: flex-start;
  margin: 5px 10px 0;
  font-weight: bold;
  color: #fb6f91;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
`;

export const Strong = styled.Text`
  font-weight: bold;
`;
