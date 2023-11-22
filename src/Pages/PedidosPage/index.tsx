import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header";
import { userInterface } from "../HomePage";
import { FooterTitle } from "../HomePage/style";
import {
  Card,
  CardButton,
  CardContainer,
  CardImage,
  CardSubtitle,
  CardTitle,
  Container,
  ContainerOptions,
  MainContainer,
  PaymentSelectorWrapper,
  PedidoButton,
  ResumoContainer,
  ResumoPreco,
  ResumoTitle,
  SectionContainer,
  SectionSubtitle,
  SectionTitle,
} from "./style";

export const PedidosPage = () => {
  const navigate = useNavigate();

  interface FormatosInterface {
    nome: string;
    valor: number;
    imagem: string;
    _id: string;
  }
  const [formatosBolo, setFormatosBolo] = useState<FormatosInterface[]>([]);
  const [massasBolo, setMassasBolo] = useState<FormatosInterface[]>([]);
  const [coberturasBolo, setCoberturasBolo] = useState<FormatosInterface[]>([]);
  const [acompanhamentosBolo, setAcompanhamentosBolo] = useState<
    FormatosInterface[]
  >([]);

  const [selectedFormato, setSelectedFormato] = useState<FormatosInterface>();
  const [selectedMassa, setSelectedMassa] = useState<FormatosInterface>();
  const [selectedCobertura, setSelectedCobertura] =
    useState<FormatosInterface>();
  const [selectedAcompanhamentos, setSelectedAcompanhamentos] = useState<
    FormatosInterface[]
  >([]);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [metodoRetirada, setMetodoRetirada] = useState("");

  const [address, setAddress] = useState("");

  const [userInfo, setUserInfo] = useState<userInterface>();

  const getUserInfo = async () => {
    const { data } = await axios.get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    setUserInfo(data);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    console.log(address);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleRetirada = (event) => {
    setMetodoRetirada(event.target.value);
  };

  const getBoloData = async () => {
    const { data: formato } = await axios.get(
      "http://localhost:3000/formatos-de-bolo"
    );
    const { data: massa } = await axios.get(
      "http://localhost:3000/massa-de-bolo"
    );
    const { data: complementos } = await axios.get(
      "http://localhost:3000/complementos"
    );
    const { data: cobertura } = await axios.get(
      "http://localhost:3000/coberturas-de-bolo"
    );
    setFormatosBolo(formato);
    setMassasBolo(massa);
    setAcompanhamentosBolo(complementos);
    setCoberturasBolo(cobertura);
  };

  useEffect(() => {
    getBoloData();
  }, []);

  const total = selectedAcompanhamentos.reduce(
    (acumulador, acompanhamento) => acumulador + acompanhamento.valor,
    0
  );

  const acomp = selectedAcompanhamentos.map((acomp) => acomp.nome);

  const returnLink = () => {
    if (
      selectedCobertura &&
      selectedFormato &&
      selectedMassa &&
      userInfo &&
      selectedPayment
    ) {
      const msg = "Resumo do seu pedido: ";
      const msg1 = `Nome: ${userInfo.nome}, Telefone: ${userInfo.telefone}`;
      const msg2 = `Formato do bolo: ${selectedFormato?.nome}, tipo de cobertura: ${selectedCobertura?.nome}, tipo da massa: ${selectedMassa?.nome}`;
      const msg3 = `Método de pagamento: ${selectedPayment}`;

      let messages = [msg, msg1, msg2, msg3];

      if (metodoRetirada === "delivery") {
        const msg4 = `Endereço de entrega: ${address}`;
        messages = [...messages, msg4];
      }

      const msg5 = `Seus acompanhamentos são: ${acomp.map((a) => " " + a)}`;
      messages = [...messages, msg5];

      const totalValue =
        selectedCobertura?.valor +
        selectedFormato?.valor +
        selectedMassa?.valor +
        total;
      const msg6 = `O total foi de R$${totalValue.toFixed(2)}`;
      messages = [...messages, msg6];

      const encodedMessages = messages.map((message) =>
        encodeURIComponent(message)
      );

      const whatsappLink = `https://wa.me/5511942482901?text=${encodedMessages.join(
        "%0a"
      )}`;

      return whatsappLink;
    }

    return "";
  };

  const cadastrarPedido = async () => {
    if (selectedCobertura && selectedFormato && selectedMassa) {
      try {
        const response = await axios.post(
          "http://localhost:3000/pedidos/cadastrar",
          {
            formato: selectedFormato.nome,
            massa: selectedMassa.nome,
            cobertura: selectedCobertura.nome,
            acompanhamentos: acomp,
            total:
              selectedCobertura?.valor +
              selectedFormato?.valor +
              selectedMassa?.valor +
              total,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        console.log(response);
        navigate("/");
      } catch (error) {
        console.error("Erro no login:", error);
      }
    }
  };

  return (
    <div
      style={{
        background: "#c8e5ed",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <SectionContainer>
        <SectionTitle>Formato</SectionTitle>
        <SectionSubtitle>Escolha um formato para o seu bolo</SectionSubtitle>

        <ContainerOptions>
          {formatosBolo &&
            formatosBolo.map((formatos) => (
              <CardContainer
                style={
                  selectedFormato === formatos
                    ? { border: "solid 2px", borderRadius: "2rem" }
                    : {}
                }
                key={formatos._id}
              >
                <Card>
                  <CardImage src={formatos.imagem} alt="" />
                  <Container>
                    <CardTitle>{formatos.nome}</CardTitle>
                    <CardSubtitle>R${formatos.valor}</CardSubtitle>
                    <CardButton
                      onClick={() => {
                        setSelectedFormato(formatos);
                      }}
                    >
                      Escolher
                    </CardButton>
                  </Container>
                </Card>
              </CardContainer>
            ))}
        </ContainerOptions>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Massa</SectionTitle>
        <SectionSubtitle>Escolha o sabor para a massa do bolo</SectionSubtitle>

        <ContainerOptions>
          {massasBolo &&
            massasBolo.map((massa) => (
              <CardContainer
                style={
                  selectedMassa === massa
                    ? { border: "solid 2px", borderRadius: "2rem" }
                    : {}
                }
                key={massa._id}
              >
                <Card>
                  <CardImage src={massa.imagem} alt="" />
                  <Container>
                    <CardTitle>{massa.nome}</CardTitle>
                    <CardSubtitle>R${massa.valor}</CardSubtitle>
                    <CardButton
                      onClick={() => {
                        setSelectedMassa(massa);
                      }}
                    >
                      Escolher
                    </CardButton>
                  </Container>
                </Card>
              </CardContainer>
            ))}
        </ContainerOptions>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Cobertura</SectionTitle>
        <SectionSubtitle>
          Escolha o sabor para a cobertura do bolo
        </SectionSubtitle>

        <ContainerOptions>
          {coberturasBolo &&
            coberturasBolo.map((cobertura) => (
              <CardContainer
                style={
                  selectedCobertura === cobertura
                    ? { border: "solid 2px", borderRadius: "2rem" }
                    : {}
                }
                key={cobertura._id}
              >
                <Card>
                  <CardImage src={cobertura.imagem} alt="" />
                  <Container>
                    <CardTitle>{cobertura.nome}</CardTitle>
                    <CardSubtitle>R${cobertura.valor}</CardSubtitle>
                    <CardButton
                      onClick={() => {
                        setSelectedCobertura(cobertura);
                      }}
                    >
                      Escolher
                    </CardButton>
                  </Container>
                </Card>
              </CardContainer>
            ))}
        </ContainerOptions>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Acompanhamentos</SectionTitle>
        <SectionSubtitle>
          Escolha um ou mais acompanhamentos para o bolo
        </SectionSubtitle>

        <ContainerOptions>
          {acompanhamentosBolo &&
            acompanhamentosBolo.map((acompanhamento) => (
              <CardContainer
                style={
                  selectedAcompanhamentos.includes(acompanhamento)
                    ? { border: "solid 2px", borderRadius: "2rem" }
                    : {}
                }
                key={acompanhamento._id}
              >
                <Card>
                  <CardImage src={acompanhamento.imagem} alt="" />
                  <Container>
                    <CardTitle>{acompanhamento.nome}</CardTitle>
                    <CardSubtitle>R${acompanhamento.valor}</CardSubtitle>
                    <CardButton
                      onClick={() => {
                        // Verifica se o acompanhamento já está selecionado
                        if (selectedAcompanhamentos.includes(acompanhamento)) {
                          // Remove o acompanhamento da lista de selecionados
                          setSelectedAcompanhamentos((prevSelected) =>
                            prevSelected.filter(
                              (item) => item !== acompanhamento
                            )
                          );
                        } else {
                          // Adiciona o acompanhamento à lista de selecionados
                          setSelectedAcompanhamentos((prevSelected) => [
                            ...prevSelected,
                            acompanhamento,
                          ]);
                        }
                      }}
                    >
                      Escolher
                    </CardButton>
                  </Container>
                </Card>
              </CardContainer>
            ))}
        </ContainerOptions>
      </SectionContainer>

      <PaymentSelectorWrapper>
        <ResumoTitle>Escolha a forma de pagamento</ResumoTitle>
        <select value={selectedPayment} onChange={handlePaymentChange}>
          <option value="">Escolha uma opção</option>
          <option value="pix">PIX</option>
          <option value="transferencia">Transferência Bancária</option>
          <option value="retirada">Pagamento na Retirada</option>
        </select>
      </PaymentSelectorWrapper>

      <PaymentSelectorWrapper>
        <ResumoTitle>Escolha a forma entrega</ResumoTitle>
        <select value={metodoRetirada} onChange={handleRetirada}>
          <option value="">Escolha uma opção</option>
          <option value="delivery">Delivery</option>
          <option value="retirada">Retirada</option>
        </select>
      </PaymentSelectorWrapper>

      {metodoRetirada === "delivery" && (
        <div
          style={{
            // width: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          <ResumoTitle>Digite o endereço</ResumoTitle>
          <input
            style={{ width: "500px", padding: "10px", borderRadius: "10px" }}
            type="text"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
      )}

      <SectionContainer>
        <h1>Resumo</h1>

        <MainContainer>
          <ResumoContainer>
            <ResumoTitle>Formato</ResumoTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ResumoTitle>{selectedFormato?.nome}</ResumoTitle>
              <ResumoPreco>R${selectedFormato?.valor}</ResumoPreco>
            </div>
          </ResumoContainer>

          <ResumoContainer>
            <ResumoTitle>Massa</ResumoTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ResumoTitle>{selectedMassa?.nome}</ResumoTitle>
              <ResumoPreco>R${selectedMassa?.valor}</ResumoPreco>
            </div>
          </ResumoContainer>

          <ResumoContainer>
            <ResumoTitle>Cobertura</ResumoTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ResumoTitle>{selectedCobertura?.nome}</ResumoTitle>
              <ResumoPreco>R${selectedCobertura?.valor}</ResumoPreco>
            </div>
          </ResumoContainer>

          <ResumoContainer>
            <ResumoTitle>Acompanhamentos</ResumoTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {selectedAcompanhamentos.map((selectedAcompanhamento) => (
                <div key={selectedAcompanhamento._id}>
                  <ResumoTitle style={{ fontSize: "2rem" }}>
                    {selectedAcompanhamento?.nome}
                  </ResumoTitle>
                </div>
              ))}
              <ResumoPreco>R${total}</ResumoPreco>
            </div>
          </ResumoContainer>

          {selectedCobertura &&
            selectedFormato &&
            selectedMassa &&
            selectedAcompanhamentos && (
              <>
                <ResumoContainer>
                  <ResumoTitle>Total</ResumoTitle>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* <ResumoTitle>{selectedCobertura?.nome}</ResumoTitle> */}
                    <ResumoPreco>
                      R$
                      {selectedCobertura?.valor +
                        selectedFormato?.valor +
                        selectedMassa?.valor +
                        total}
                    </ResumoPreco>
                    <p>Pagamento: {selectedPayment}</p>
                  </div>
                </ResumoContainer>

                <PedidoButton onClick={() => cadastrarPedido()}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontSize: 20,
                    }}
                    target="_blank"
                    to={returnLink()}
                  >
                    Fazer Pedido
                  </Link>
                </PedidoButton>
              </>
            )}
        </MainContainer>
      </SectionContainer>

      <div
        style={{
          height: "25vh",
          background: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a target="_blank" href="https://www.instagram.com/sweetchefdoces/">
              <img
                src="src/assets/instagram-logo.png"
                width={30}
                height={30}
                alt=""
              />
            </a>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a target="_blank" href="https://wa.me/5511984290083">
              <img
                src="src/assets/whatsapp-logo.png"
                width={30}
                height={30}
                alt=""
              />
            </a>
          </div>
        </div>
        <div>
          <FooterTitle>Sweet Chef</FooterTitle>
        </div>
      </div>
    </div>
  );
};
