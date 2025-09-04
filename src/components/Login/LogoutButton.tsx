import { useAuth } from "../../context/AuthContext/useAuth";


function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
