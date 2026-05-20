import { css } from 'styled-components';

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
};

export const mobile = (styles: any) => css`
  @media (max-width: ${breakpoints.mobile}px) {
    ${styles}
  }
`;

export const tablet = (styles: any) => css`
  @media (max-width: ${breakpoints.tablet}px) {
    ${styles}
  }
`;