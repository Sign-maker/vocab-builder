import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";
import { useAuthStore } from "../../zustandStore/authStore";

const LoginPage = () => {
  const signIn = useAuthStore((state) => state.signIn);

  return (
    <Suspense fallback={<Loader />}>
      <div>LoginPage</div>
      <button
        onClick={() =>
          signIn({
            email: "dima@email.com",
            password: "qwerty1",
          })
        }
      >
        Login
      </button>
    </Suspense>
  );
};

export default LoginPage;
