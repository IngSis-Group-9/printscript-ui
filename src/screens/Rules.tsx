import {withNavbar} from "../components/navbar/withNavbar.tsx";
import {Box, Typography} from "@mui/material";
import LintingRulesList from "../components/linting-rules/LintingRulesList.tsx";
import FormattingRulesList from "../components/formatting-rules/FormattingRulesList.tsx";

const RulesScreen = () => {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant={"h3"} sx={{color: 'white', margin: '25px 0'}}>
                Rules
            </Typography>
          <LintingRulesList />
          <FormattingRulesList/>

        </Box>
    )
}

export default withNavbar(RulesScreen);