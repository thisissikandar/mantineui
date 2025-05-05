import { useParams } from "react-router-dom";
import {
  Card,
  Title,
  Text,
  Grid,
  Badge,
  Divider,
  Loader,
  Avatar,
  Tabs,
  Notification,
  Group,
  CopyButton,
  Accordion,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconAlertCircle,
  IconCheck,
  IconCopy,
} from "@tabler/icons-react";
import { useState } from "react";

export default function DetailPage() {
  const { id } = useParams();
  const [showError, setShowError] = useState(false);

  // Fetch user details
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
    onError: () => setShowError(true),
  });

  // Enrich: Fetch user's posts (dummyjson supports /users/:id/posts)
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryKey: ["user-posts", id],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}/posts`);
      if (!res.ok) throw new Error("Posts not found");
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

  if (isError || !user)
    return (
      <Notification
        icon={<IconAlertCircle size={18} />}
        color="red"
        title="Error"
        onClose={() => setShowError(false)}
        mt="md"
      >
        User not found
      </Notification>
    );

  return (
    <Card shadow="sm" p="lg" withBorder>
      <Group align="center" mb="md">
        <Avatar src={user.image} size={80} radius="xl" />
        <div>
          <Title order={2}>
            {user.firstName} {user.lastName}
          </Title>
          <Text color="dimmed">{user.email}</Text>
        </div>
      </Group>
      <Divider my="sm" />
      <Tabs defaultValue="details">
        <Tabs.List>
          <Tabs.Tab value="details" icon={<IconUser size={16} />}>
            Details
          </Tabs.Tab>
          <Tabs.Tab value="posts" icon={<IconMail size={16} />}>
            Posts
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="details" pt="xs">
          <Grid>
            <Grid.Col span={6}>
              <Text>
                <strong>Username:</strong> {user.username}
              </Text>
              <Text>
                <strong>Age:</strong> <Badge color="gray">{user.age}</Badge>
              </Text>
              <Text>
                <strong>Gender:</strong>{" "}
                <Badge color={user.gender === "male" ? "blue" : "pink"}>
                  {user.gender}
                </Badge>
              </Text>
              <Text>
                <strong>Blood Group:</strong>{" "}
                <Badge color="red">{user.bloodGroup}</Badge>
              </Text>
              <Text>
                <strong>Eye Color:</strong>{" "}
                <Badge color="green">{user.eyeColor}</Badge>
              </Text>
              <Text>
                <strong>Hair:</strong> {user.hair?.color} / {user.hair?.type}
              </Text>
              <Text>
                <strong>Phone:</strong> {user.phone}
              </Text>
              <Text>
                <strong>Birth Date:</strong> {user.birthDate}
              </Text>
              <Text>
                <strong>Role:</strong> <Badge color="teal">{user.role}</Badge>
              </Text>
              <Text>
                <strong>University:</strong> {user.university}
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
              <Divider my="xs" />
              <Title order={5} mt="sm">
                Company
              </Title>
              <Text>
                <strong>Name:</strong> {user.company?.name}
              </Text>
              <Text>
                <strong>Department:</strong> {user.company?.department}
              </Text>
              <Text>
                <strong>Title:</strong> {user.company?.title}
              </Text>
              <Text>
                <strong>Company Address:</strong>{" "}
                {user.company?.address?.address}, {user.company?.address?.city},{" "}
                {user.company?.address?.state}
              </Text>
            </Grid.Col>
          </Grid>
          <Accordion mt="md">
            <Accordion.Item value="bank">
              <Accordion.Control>Bank Info</Accordion.Control>
              <Accordion.Panel>
                <Text>
                  <strong>Card Type:</strong> {user.bank?.cardType}
                </Text>
                <Text>
                  <strong>Card Number:</strong> {user.bank?.cardNumber}
                </Text>
                <Text>
                  <strong>Currency:</strong> {user.bank?.currency}
                </Text>
                <Text>
                  <strong>IBAN:</strong> {user.bank?.iban}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="crypto">
              <Accordion.Control>Crypto Wallet</Accordion.Control>
              <Accordion.Panel>
                <Text>
                  <strong>Coin:</strong> {user.crypto?.coin}
                </Text>
                <Text>
                  <strong>Wallet:</strong> {user.crypto?.wallet}
                  <CopyButton value={user.crypto?.wallet}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          onClick={copy}
                          ml="sm"
                        >
                          {copied ? (
                            <IconCheck size={16} />
                          ) : (
                            <IconCopy size={16} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Text>
                <Text>
                  <strong>Network:</strong> {user.crypto?.network}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="tech">
              <Accordion.Control>Technical Info</Accordion.Control>
              <Accordion.Panel>
                <Text>
                  <strong>IP:</strong> {user.ip}
                </Text>
                <Text>
                  <strong>MAC Address:</strong> {user.macAddress}
                </Text>
                <Text>
                  <strong>User Agent:</strong> {user.userAgent}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Tabs.Panel>
        <Tabs.Panel value="posts" pt="xs">
  {postsLoading ? (
    <Loader size="sm" />
  ) : postsError ? (
    <Notification color="red" title="Error loading posts" />
  ) : (
    <div>
      {posts?.posts?.length ? (
        posts.posts.map((post: any) => (
          <Card key={post.id} shadow="xs" mb="sm" withBorder>
            <Title order={5}>{post.title}</Title>
            <Text mb="xs">{post.body}</Text>
            <Group spacing="xs" mb="xs">
              {post.tags?.map((tag: string) => (
                <Badge key={tag} color="blue" variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>
            <Group spacing="md">
              <Text size="sm" color="dimmed">
                👍 {post.reactions?.likes ?? 0}
              </Text>
              <Text size="sm" color="dimmed">
                👎 {post.reactions?.dislikes ?? 0}
              </Text>
              <Text size="sm" color="dimmed">
                👁️ {post.views ?? 0}
              </Text>
            </Group>
          </Card>
        ))
      ) : (
        <Text>No posts found.</Text>
      )}
    </div>
  )}
</Tabs.Panel>
      </Tabs>
    </Card>
  );
}
