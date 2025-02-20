import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";

const LandingPage = () => {
  const { data: currentUser } = useCurrentUserQuery();

  return (
    <main>
      <h1>Hello {currentUser?.email}</h1>
    </main>
  );
};

export default LandingPage;
