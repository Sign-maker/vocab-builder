import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";

const LoginPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>LoginPage</div>;
    </Suspense>
  );
};

export default LoginPage;
