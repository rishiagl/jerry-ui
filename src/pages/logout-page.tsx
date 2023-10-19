import { useAuth0 } from "@auth0/auth0-react";

export const LogoutPage = () => {
    const { logout } = useAuth0();
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
};