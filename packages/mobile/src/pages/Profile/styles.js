import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  align-self: center;
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 30px 0 10px;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 30 },
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
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
  margin-top: 20px;
`;

export const SignOutButton = styled(Button)`
  margin-top: 20px;
  background: #d44059;
`;
