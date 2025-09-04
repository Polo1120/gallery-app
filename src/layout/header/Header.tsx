import { useAuth } from "../../context/AuthContext/useAuth";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { HeaderDesktop } from "../../components/Header/HeaderDesktop";
import { HeaderMobile } from "../../components/Header/HeaderMobile";

export default function Header() {
  const { token } = useAuth();
  const { isSm } = useBreakpoint();

  if (!token) return null;

  return isSm ? <HeaderMobile /> : <HeaderDesktop />;
}
