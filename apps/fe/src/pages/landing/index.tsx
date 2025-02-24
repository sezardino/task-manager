import { Button } from "@/components/ui/button";
import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { ApplicationUrls } from "@/libs/router-dom";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { data: currentUser } = useCurrentUserQuery();

  return (
    <main>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Manage Teams and Projects
              <br className="hidden lg:inline-block" />
              Easily and Efficiently
            </h1>
            <p className="mb-8 leading-relaxed">
              Create organizations, invite members, and assign roles. Lead
              projects, track tasks, and achieve goals together. A simple yet
              powerful platform for seamless collaboration.
            </p>
            {!currentUser && (
              <div className="flex justify-center gap-3">
                <Button asChild>
                  <Link to={ApplicationUrls.auth.registration}>Register</Link>
                </Button>
                <Button variant={"accent"}>
                  <Link to={ApplicationUrls.auth.login}>Login</Link>
                </Button>
              </div>
            )}
            {currentUser && (
              <Button>
                <Link to={ApplicationUrls.application.index}>To app</Link>
              </Button>
            )}
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
