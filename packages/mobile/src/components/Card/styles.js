import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

export const Container = styled.View`
  border-radius: 4px;
  background: #fff;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'center',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
})`
  width: 100%;
  height: 150px;
  align-content: stretch;
`;

export const Info = styled.View`
  margin: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  color: #333;
`;

export const Row = styled.View`
  margin-top: 11px;
  flex-direction: row;
  align-items: center;
`;

export const RowIcon = styled(Icon).attrs({
  size: 14,
})`
  color: #999;
`;

export const Text = styled.Text`
  font-size: 13px;
  line-height: 15px;
  color: #999;
  margin-left: 5px;
`;

export const ActionButton = styled(Button)`
  margin-top: 16px;
`;
