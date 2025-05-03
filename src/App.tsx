import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  Header,
  Navbar,
  Text,
  Title,
  Button,
  Group,
  NavLink,
  Box,
} from "@mantine/core";
import {
  IconRocket,
  IconList,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
import useTokenStore from "./store/app.store";

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { token, setToken } = useTokenStore((state) => state);

  if (token === "") {
    return <Navigate to={"/auth/login"} replace />;
  }

  const logout = () => {
    console.log("Logging out!");
    setToken("");
  };
  return (
    <>
      {/* <Outlet /> */}
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Group position="apart">
              <Title order={3}>Mantineui</Title>
              <Group>
                <>
                 
                  <Button variant="gradient" onClick={logout}>
                    Logout
                  </Button>
                </>
              </Group>
            </Group>
          </Header>
        }
        navbar={
          <Navbar width={{ base: 200 }} p="xs">
            <Navbar.Section grow>
              <NavLink
                label="Home"
                icon={<IconRocket size={16} />}
                onClick={() => navigate("/")}
              />
              {token && (
                <NavLink
                  label="Details"
                  icon={<IconList size={16} />}
                  onClick={() => navigate("/home")}
                />
              )}
            </Navbar.Section>
            <Navbar.Section>
              {token ? (
                <NavLink
                  label="Logout"
                  icon={<IconLogout size={16} />}
                  onClick={logout}
                />
              ) : (
                <NavLink
                  label="Login"
                  icon={<IconLogin size={16} />}
                  onClick={() => navigate("/login")}
                />
              )}
            </Navbar.Section>
          </Navbar>
        }
      >
        <Box>
          <Outlet />
        </Box>
      </AppShell>
    </>
  );
}
