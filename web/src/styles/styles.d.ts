import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
      title: string;
    
      colors: {
        primary: string;
        
        background: string;
        content: string;
        text: string;
        spanText: string;
        incidentColor: string,
        input: string,
        inputText: string,
    };
  }
}
