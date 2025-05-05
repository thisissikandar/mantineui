import { useEffect, useState } from "react";
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
  ColorSchemeProvider,
  ActionIcon,
  Breadcrumbs,
} from "@mantine/core";
import {
  IconLogin,
  IconLogout,
  IconSun,
  IconMoonStars,
  IconHome2,
  IconUser,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconFingerprint,
  IconSettings,
} from "@tabler/icons-react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
import useTokenStore from "./store/app.store";

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const toggleColorScheme = () =>
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));

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
  const pathnames = pathname.split("/").filter((x) => x);
  const breadcrumbItems = [
    <span
      key="home"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/")}
    >
      Home
    </span>,
    ...pathnames.map((name, idx) => {
      const routeTo = "/" + pathnames.slice(0, idx + 1).join("/");
      return (
        <span
          key={routeTo}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(routeTo)}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
      );
    }),
  ];
  const navLinks = [
    {
      label: "Home",
      icon: <IconHome2 size={16} />,
      path: "/home",
    },
    {
      label: "Profile",
      icon: <IconUser size={16} />,
      path: "/profile",
    },
    {
      label: "Analytics",
      icon: <IconDeviceDesktopAnalytics size={16} />,
      path: "/analytics",
    },
    {
      label: "Releases",
      icon: <IconCalendarStats size={16} />,
      path: "/releases",
    },
    {
      label: "Security",
      icon: <IconFingerprint size={16} />,
      path: "/security",
    },
    {
      label: "Settings",
      icon: <IconSettings size={16} />,
      path: "/settings",
    },
  ];
  return (
    <>
      <MantineProvider
        theme={{ ...theme, colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <AppShell
            padding="md"
            header={
              <Header height={60} p="xs">
                <Group position="apart">
                  <Title
                    order={3}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    Mantineui
                  </Title>
                  <Group>
                    <ActionIcon
                      variant="outline"
                      color={colorScheme === "dark" ? "yellow" : "blue"}
                      onClick={toggleColorScheme}
                      title="Toggle color scheme"
                    >
                      {colorScheme === "dark" ? (
                        <IconSun size={18} />
                      ) : (
                        <IconMoonStars size={18} />
                      )}
                    </ActionIcon>
                    <Button variant="gradient" onClick={logout}>
                      Logout
                    </Button>
                  </Group>
                </Group>
              </Header>
            }
            navbar={
              <Navbar width={{ base: 200 }} p="xs">
                <Navbar.Section grow>
                {navLinks.map((link) => (
                    <NavLink
                      key={link.label}
                      label={link.label}
                      icon={link.icon}
                      active={pathname === link.path}
                      onClick={() => navigate(link.path)}
                      style={{
                        borderRadius: 8,
                        marginBottom: 4,
                        fontWeight: 500,
                        background:
                          pathname === link.path
                            ? "linear-gradient(90deg, #228be6 0%, #4dabf7 100%)"
                            : undefined,
                        color:
                          pathname === link.path
                            ? "#fff"
                            : colorScheme === "dark"
                            ? "#adb5bd"
                            : "#222",
                        boxShadow:
                        pathname === link.path
                        ? "0 2px 8px rgba(34,139,230,0.12)"
                        : undefined,
                    transition: "background 0.2s, color 0.2s",
                  }}
                />
              ))}
                </Navbar.Section>
                <Navbar.Section>
                  {token ? (
                    <NavLink
                      label="Logout"
                      icon={<IconLogout size={16} />}
                      onClick={logout}
                      style={{
                        borderRadius: 8,
                        marginTop: 12,
                        color: colorScheme === "dark" ? "#ff6b6b" : "#c92a2a",
                        fontWeight: 600,
                      }}
                    />
                  ) :(
                    <NavLink
                      label="Login"
                      icon={<IconLogin size={16} />}
                      onClick={() => navigate("/auth/login")}
                      style={{
                        borderRadius: 8,
                        marginTop: 12,
                        color: colorScheme === "dark" ? "#51cf66" : "#2b8a3e",
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Navbar.Section>
              </Navbar>
            }
          >
            <Box>
              <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
              {/* Page Title */}
              {/* <Title order={2} mb="md">
                {pathnames.length === 0
                  ? "Home"
                  : pathnames[pathnames.length - 1].charAt(0).toUpperCase() +
                    pathnames[pathnames.length - 1].slice(1)}
              </Title> */}
              <Outlet />
            </Box>
          </AppShell>
        </ColorSchemeProvider>
      </MantineProvider>
    </>
  );
}
