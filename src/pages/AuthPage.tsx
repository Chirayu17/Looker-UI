import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Divider,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { useLoaderData } from "react-router";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";

const AuthPage: React.FC<{}> = () => {
  const theme = useTheme();
  const isNewUserPage = useLoaderData() as boolean;
  const component: React.JSX.Element = isNewUserPage ? <Signup /> : <Login />;
  const title = isNewUserPage ? "Create Account" : "Login";
  const userQuestion = isNewUserPage ? "Existing User? " : "New User? ";
  const switchLink = isNewUserPage ? "/login" : "/signup";
  const switchLinkText = isNewUserPage ? "Login here" : "Sign up here";

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: 10, p: 2 }}>
          <CardHeader
            title={title}
            sx={{
              color: theme.palette.info.dark,
              textTransform: "uppercase",
            }}
          />
          <Divider />
          {component}
        </Card>
        <Typography
          paragraph={true}
          align="center"
          color={"white"}
          sx={{ m: 1 }}
        >
          {userQuestion}
          <Link href={switchLink} color={"inherit"}>
            {switchLinkText}
          </Link>
        </Typography>
      </Container>
    </main>
  );
};

export default AuthPage;
