import Button, { ButtonProps } from "@material-ui/core/Button";

interface ILinkButtonProps extends ButtonProps {
  to?: string;
}

const LinkButton: React.ReactType<ILinkButtonProps> = Button;

export default LinkButton;
