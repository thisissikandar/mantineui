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
  Box,
  Center,
  Progress,
  Loader,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useInputState } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import useTokenStore from "../store/app.store";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../http/api";
import toast from "react-hot-toast";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text component="div" c={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size={14} stroke={1.5} />
        ) : (
          <IconX size={14} stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}
const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];
function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}
export function Register() {
  const [value, setValue] = useInputState("");
  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: "0ms" } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const setToken = useTokenStore((state) => state.setToken);
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      console.log("response", response);
      setToken(response.data.token);
      toast.success("Register Successfull please login to continue");
      navigate("/auth/login");
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err?.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleRegisterSubmit = () => {
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = value;
    console.log("data", { email, password, name: username });

    if (!email || !password) {
      return toast("Please enter email and password");
    }

    mutation.mutate({ email, password, name: username, role: "customer" });
  };
  return (
    <Container size={420}>
      <Title ta="center">Register!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        already have an account{" "}
        <Link to="/auth/login">
          <Anchor size="sm" component="button">
            Login
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="lg" p={30} mt={30} radius="md">
        <TextInput
          ref={usernameRef}
          label="Username"
          placeholder="username"
          required
        />
        <TextInput
          ref={emailRef}
          label="Email"
          placeholder="you@mantine.dev"
          required
        />
        <div>
          <PasswordInput
            value={value}
            onChange={setValue}
            placeholder="Your password"
            label="Password"
            required
          />

          <Group gap={5} grow mt="xs" mb="md">
            {bars}
          </Group>

          <PasswordRequirement
            label="Has at least 6 characters"
            meets={value.length > 5}
          />
          {checks}
        </div>
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        <Button
          fullWidth
          onClick={handleRegisterSubmit}
          loading={mutation.isLoading}
          mt="xl"
        >
          {mutation?.isPending && <Loader size={30} />} <span>Sign up</span>
        </Button>
      </Paper>
    </Container>
  );
}
