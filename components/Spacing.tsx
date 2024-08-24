import React, {PropsWithChildren} from 'react';
import {ViewProps, View} from 'react-native';

type Props = Omit<ViewProps, 'style'> &
  PropsWithChildren & {
    value?: number;
    steps?: number;
    direction?: 'horizontal' | 'vertical';
    height?: number;
  };

export const Spacing = ({
  value = 8,
  steps = 1,
  direction = 'vertical',
  height,
  ...props
}: Props) => (
  <View
    style={{
      [direction === 'horizontal' ? 'paddingLeft' : 'paddingTop']:
        value * steps,
      height,
    }}
    {...props}
  />
);
