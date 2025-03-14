// types.d.ts
import 'nativewind/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View as NativeView, Text as NativeText } from 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
}