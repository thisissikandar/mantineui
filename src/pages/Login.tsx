import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTokenStore from "../store/app.store";
import { login } from "../http/api";
import toast from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.data.token);
      toast.success("Login Successfull please login to continue");
      navigate("/home");
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err?.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("data", { email, password });

    if (!email || !password) {
      return alert("Please enter email and password");
    }

    mutation.mutate({ email, password });
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Link to="/auth/register">
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="lg" p={30} mt={30} radius="md">
        <TextInput
          ref={emailRef}
          label="Email"
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          ref={passwordRef}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth onClick={handleLoginSubmit} mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
