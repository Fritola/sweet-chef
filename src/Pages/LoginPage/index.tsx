// LoginPage.js
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, FormContainer, Input, PageContainer } from "./style";

export const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: handleSubmitRegister,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: unknown) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        {
          email: data.email,
          senha: data.senha,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("userToken", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const { handleSubmit: handleSubmitForm2, register: registerSignin } =
    useForm();

  const onSubmitForm2 = async (data: any) => {
    console.log(data.email);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/cadastrar",
        {
          nome: data.nome,
          email: data.cadastroEmail,
          senha: data.cadastroSenha,
          telefone: data.telefone,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("userToken", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };
  return (
    <>
      {/* <Header /> */}
      <PageContainer>
        <div style={{ marginBottom: "50px" }}>
          <img src="src/assets/logo.png" alt="" width={200} height={200} />
        </div>

        <div style={{ display: "flex", width: "70%" }}>
          <div style={{ backgroundColor: "#fff", flex: 1 }}>
            <div
              style={{
                backgroundColor: "#6bd1ca",
                textAlign: "center",
                padding: 10,
              }}
            >
              <p style={{ color: "#fff", fontSize: 32, fontFamily: "serif" }}>
                Login
              </p>
            </div>
            <div style={{ marginTop: 20, color: "#999898" }}>
              <p style={{ textAlign: "center" }}>
                Entre com seu e-mail e senha
              </p>
            </div>
            <FormContainer onSubmit={handleSubmitRegister(onSubmit)}>
              <div>
                <Input
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: "Email obrigatório" })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert">{errors.email.message}</p>}
              </div>
              <Input
                type="password"
                placeholder="Senha"
                {...register("senha", { required: true })}
              />

              <Button style={{ maxWidth: 100 }} type="submit">
                Entrar
              </Button>
            </FormContainer>
          </div>

          {/* Melhor forma, login e cadastro na mesma pagina? */}
          <div
            style={{
              borderLeft: "solid 1px #eee",
              backgroundColor: "#fff",
              flex: 1,
            }}
          >
            <div
              style={{
                backgroundColor: "#6bd1ca",
                textAlign: "center",
                padding: 10,
              }}
            >
              <p style={{ color: "#fff", fontSize: 32, fontFamily: "serif" }}>
                Cadastro
              </p>
            </div>

            <FormContainer onSubmit={handleSubmitForm2(onSubmitForm2)}>
              <Input
                type="text"
                placeholder="Nome"
                {...registerSignin("nome", { required: "Email obrigatório" })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <div>
                <Input
                  type="text"
                  placeholder="Email"
                  {...registerSignin("cadastroEmail", {
                    required: "Email obrigatório",
                  })}
                  aria-invalid={errors.registerEmail ? "true" : "false"}
                />
                {errors.registerEmail && (
                  <p role="alert">{errors.registerEmail.message}</p>
                )}
              </div>
              <Input
                type="password"
                placeholder="Senha"
                {...registerSignin("cadastroSenha", { required: true })}
              />

              <Input
                type="tel"
                placeholder="Telefone"
                {...registerSignin("telefone", { required: true })}
              />
              <Button style={{ backgroundColor: "#54d64d" }} type="submit">
                Cadastrar
              </Button>
            </FormContainer>
          </div>
        </div>
      </PageContainer>
    </>
  );
};
