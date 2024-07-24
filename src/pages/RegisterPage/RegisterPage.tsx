import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";
import { useAuthStore } from "../../zustandStore/authStore";

const RegisterPage = () => {
  const signUp = useAuthStore((state) => state.signUp);

  return (
    <Suspense fallback={<Loader />}>
      <div>RegisterPage</div>
      <button
        onClick={() =>
          signUp({
            name: "dima",
            email: "dima@email.com",
            password: "qwerty1",
          })
        }
      >
        Register
      </button>
    </Suspense>
  );
};

export default RegisterPage;
