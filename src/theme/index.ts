import { createGlobalStyle } from "styled-components";
export type Palette = typeof defaultTheme.palette;

export const GlobalStyle = createGlobalStyle`
	* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
	html{
		font-size: 10px;
    line-height: 12px;
		font-weight: 400;
		font-family: 'Roboto', sans-serif;
	}
	h1, h2, h3, h4, h5, p, span {
		font-style: normal;
	}
	p, span {
		letter-spacing: .75px
	}
`;

export const defaultTheme = {
  palette: {
    darkblue: "#343951",
    orange: "#ff9f00",
    lightorange: "#FFB233",
    darkgray: "#858A9D",
    gray: "#bcbeca",
    blue: "#689ff8",
    green: "#4ac29d",
    red: "#ff6860",
    white: "#ffffff",
    bglightgray: "#f5f6fc",
    inactive: "#c4c4c4",
    dialog: "#464c61",
    hr: "#e0e7f1",
    lightyellow: "#FFD999",
  },
};
