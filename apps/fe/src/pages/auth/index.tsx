import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { ApplicationUrls } from "@/libs/router-dom";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const { data: currentUser, isLoading } = useCurrentUserQuery();

  if (currentUser && !isLoading) navigate(ApplicationUrls.application.index);
  if (!currentUser && !isLoading) navigate(ApplicationUrls.auth.login);

  return null;
};

export default AuthPage;
