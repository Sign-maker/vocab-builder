import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>RegisterPage</div>
    </Suspense>
  );
};

export default RegisterPage;
