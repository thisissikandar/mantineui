import { useParams } from "react-router-dom";
import { Card, Title, Text, Grid, Badge, Divider, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export default function DetailPage() {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      if (!res.ok) throw new Error("User not found");
      return res.json();
    },
    enabled: !!id,
  });
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size="lg" />
      </div>
    );
  if (isError || !user) return <div>User not found</div>;

  return (
    <Card shadow="sm" p="lg" withBorder>
      <Title order={2}>
        {user.firstName} {user.lastName}
      </Title>
      <Grid>
        <Grid.Col span={6}>
          <Text>
            <strong>Email:</strong> {user.email}
          </Text>
          <Text>
            <strong>Username:</strong> {user.username}
          </Text>
          <Text>
            <strong>Gender:</strong>{" "}
            <Badge color={user.gender === "male" ? "blue" : "pink"}>
              {user.gender}
            </Badge>
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text>
            <strong>City:</strong> {user.address?.city}
          </Text>
          <Text>
            <strong>State:</strong> {user.address?.state}
          </Text>
          <Text>
            <strong>Address:</strong> {user.address?.address}
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="md" />
      <Text>
        <strong>Phone:</strong> {user.phone}
      </Text>
      <Text>
        <strong>Birth Date:</strong> {user.birthDate}
      </Text>
      <Text>
        <strong>Role:</strong> {user.role}
      </Text>
    </Card>
  );
}
