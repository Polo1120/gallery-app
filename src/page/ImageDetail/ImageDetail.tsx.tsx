import { useParams, Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import { type Image } from "../../types/Image";
import { formatDate } from "../../hooks/formatDate";

type ImageDetailProps = {
  images: Image[];
};

const ImageDetail = ({ images }: ImageDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const image = images.find((img) => img._id === id);

  if (!image) return <Typography>No se encontró la imagen</Typography>;

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        marginTop: 4,
        textAlign: "center",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "flex-start",
      }}
    >
      <Container
        className="container-image-detail"
        sx={{ justifyContent: "center" }}
      >
        <Box
          component="img"
          src={image.url}
          alt={image.title}
          sx={{
            width: "100%",
            maxWidth: { sm: "550px", xs: "358px" },
            height: "auto",
          }}
          className="image-detail"
        />
      </Container>

      <Container>
        <Typography variant="h4" align="left" gutterBottom>
          {image.title}
        </Typography>

        <Typography
          variant="body1"
          fontSize={21}
          fontWeight={100}
          align="left"
          margin={"21px 0 0 0"}
          color="text.secondary"
          lineHeight={"normal"}
        >
          Captured on {formatDate(image.dateSpecial)}
        </Typography>

        <Typography
          variant="body2"
          align="left"
          margin={"24px 0 0 0"}
          lineHeight={"normal"}
          paragraph
          fontSize={24}
        >
          {image.description}
        </Typography>
        <Typography
          className="image-detail-location"
          display={"flex"}
          alignItems={"center"}
          variant="body2"
          align="left"
          columnGap={2}
          textTransform={"capitalize"}
          margin={"24px 0 0 0"}
          lineHeight={"normal"}
          paragraph
          fontSize={16}
        >
          {image.location}
        </Typography>

        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" component={Link} to="/">
            Volver a la galería
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default ImageDetail;
