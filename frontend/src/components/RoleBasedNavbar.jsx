import { useAuth } from "../context/AuthContext";
import FarmerNavbar from "./navbars/FarmerNavbar";
import BuyerNavbar from "./navbars/BuyerNavbar";
import AdminNavbar from "./navbars/AdminNavbar";
import PublicNavbar from "./navbars/PublicNavbar";

const RoleBasedNavbar = ({ setCartOpen }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <PublicNavbar />;

  if (user.role === "farmer") return <FarmerNavbar />;
  if (user.role === "buyer") return <BuyerNavbar setCartOpen={setCartOpen} />;
  if (user.role === "admin") return <AdminNavbar />;

  return <PublicNavbar />;
};

export default RoleBasedNavbar;
