import { 
    CssBaseline, 
    ThemeProvider as MTProvider, 
    StyledEngineProvider, 
    createTheme 
} from "@mui/material";

export default function ThemeProvider({ children }) {
    const theme = createTheme()
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <MTProvider theme={theme}>
                {children}
            </MTProvider>
        </StyledEngineProvider>
    )
}