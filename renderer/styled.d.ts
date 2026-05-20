import 'styled-components';
import { Theme } from './styles/theme/type';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}