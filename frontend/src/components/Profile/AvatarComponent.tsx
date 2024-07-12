import { Avatar } from "@mui/material";

const getAvatarInitials = (name: string) => {
  const parts = name.split(" ");
  return parts
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

interface AvatarComponentProps {
  name: string;
}

const AvatarComponent = ({ name }: AvatarComponentProps) => {
  return (
    <Avatar
      sx={{
        width: 60,
        height: 60,
        backgroundColor: "#1976d2",
        fontSize: 24,
      }}
    >
      {getAvatarInitials(name || "")}
    </Avatar>
  );
};

export default AvatarComponent;