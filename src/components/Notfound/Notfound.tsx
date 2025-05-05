import {
  Button,
  Container,
  Image,
  Text,
  Title,
  Stack,
  Box,
} from "@mantine/core";
import image from "./image.svg";
import "./NotFoundImage.css";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className="notfound-root">
      {/* Mobile Image */}
      <Box className="notfound-mobileImage">
        <Image src={image} alt="Not Found" />
      </Box>

      <div className="notfound-content">
        <Title className="notfound-title">Something is not right...</Title>
        <Text c="dimmed" size="lg">
          Page you are trying to open does not exist. You may have mistyped
          the address, or the page has been moved to another URL. If you think
          this is an error contact support.
        </Text>
        <Button
          variant="outline"
          size="md"
          className="notfound-control"
          onClick={() => navigate("/")}
        >
          Get back to home page
        </Button>
      </div>

      {/* Desktop Image */}
      <Box className="notfound-desktopImage">
        <Image src={image} alt="Not Found" />
      </Box>
    </Container>
  );
}
