import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  HeaderLink,
  HeaderNome,
  LoginLink,
} from "../../Components/Header/style";
import {
  Container,
  FaqCard,
  FaqSubTitle,
  FaqTitle,
  FooterTitle,
  GaleriaTitle,
  PedidoButton,
  Sub,
  Subtitle,
  TextContainer,
  Title,
} from "./style";

export interface userInterface {
  nome: string;
  email: string;
  _id: string;
  telefone: number;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userToken");
  const [userInfo, setUserInfo] = useState<userInterface>();

  const ref = useRef(null);
  const ref2 = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick2 = () => {
    ref2.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getUserInfo = async () => {
    const { data } = await axios.get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    setUserInfo(data);
  };

  const Card = ({ faq }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
          gap: 25,
        }}
      >
        <div onClick={toggleExpand}>
          <div style={{ cursor: "pointer", fontWeight: "bold" }}>
            <FaqTitle>{faq.question}</FaqTitle>
          </div>
          {isExpanded && (
            <div style={{ marginTop: "8px" }}>
              <FaqSubTitle>{faq.answer}</FaqSubTitle>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const faqData = [
    {
      key: 1,
      question: "Como faço para solicitar um produto?",
      answer: `Na aba "Fazer Pedido" na barra de menu, selecione o formato, a massa, a cobertura e o(s) complementos de sua preferência. Em seguida aperte o botão "Confirmar" para prosseguir para o pagamento.`,
    },
    {
      key: 2,
      question: "Qual é o prazo de validade do bolo?",
      answer: "Nossos bolos geralmente tem o prazo de 5 dias após o pedido.",
    },
    {
      key: 3,
      question: "Quais são as opções de pagamento?",
      answer:
        "Aceitamos as seguintes formas de pagamento: Pix, Transferência bancária, boleto, dinheiro (se optar por retirar pessoalmente)",
    },
    {
      key: 4,
      question: "Quais são as opções de entrega?",
      answer:
        "Você tem a opção de retirar o pedido pessoalmente ou selecionar a entrega através do serviço Uber Entregas",
    },
    {
      key: 5,
      question: "Qual é o prazo de entrega padrão",
      answer: "O prazo de entrega padrão é de aproximadamente de 4 horas.",
    },
  ];

  return (
    <div style={{ background: "#c8e5ed" }}>
      <Container>
        <HeaderContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul style={{ display: "flex", listStyle: "none", gap: 55 }}>
              <HeaderLink onClick={handleClick2}>Quem somos</HeaderLink>
              <HeaderLink onClick={handleClick}>Perguntas</HeaderLink>
              <HeaderLink onClick={() => navigate("/pedidos")}>
                Fazer pedido
              </HeaderLink>
            </ul>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="src/assets/logo.png" alt="" width={100} height={90} />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <>
              {userInfo && isAuthenticated ? (
                <ul style={{ listStyle: "none" }}>
                  <HeaderNome>{userInfo.nome}</HeaderNome>
                  {/* <HeaderLink>Meus pedidos</HeaderLink> */}
                </ul>
              ) : (
                <div>
                  <LoginLink onClick={() => navigate("/login")}>
                    Login
                  </LoginLink>
                </div>
              )}
            </>
          </div>
        </HeaderContainer>

        <TextContainer>
          <Title>
            Monte seu <br /> proprio bolo
          </Title>

          <div
            style={{ width: "49%", marginTop: "15px", marginBottom: "15px" }}
          >
            <Subtitle>
              Monte seu próprio bolo em casa, escolha uma massa, cobertura,
              complementos e receba na sua porta.
              <br /> Transforme suas ocasiões em momentos especiais com
              praticidade e sabor.
            </Subtitle>
          </div>
          <PedidoButton onClick={() => navigate("/pedidos")}>
            Fazer pedido
          </PedidoButton>
        </TextContainer>
      </Container>

      <div style={{ marginTop: "6rem", background: "#c8e5ed" }}>
        <GaleriaTitle>Galeria</GaleriaTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Carousel
            width={600}
            showArrows
            swipeable
            showStatus={false}
            showThumbs={false}
            centerSlidePercentage={50}
            infiniteLoop
            autoPlay
            transitionTime={500}
            interval={2000}
            dynamicHeight
          >
            <div>
              <img
                style={{ borderRadius: 100 }}
                src="src/assets/mbr-2.jpg"
                alt="img cake"
              />
            </div>
            <div>
              <img
                style={{ borderRadius: 100 }}
                src="src/assets/mbr-3.jpg"
                alt="img cake"
              />
            </div>
            <div>
              <img
                style={{ borderRadius: 100 }}
                src="src/assets/mbr-4.jpg"
                alt="img cake"
              />
            </div>
          </Carousel>
        </div>
      </div>

      <div
        style={{
          marginTop: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#edefeb",
            width: "70%",
            minHeight: "600px",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ flex: 1, padding: "20px" }}>
              <GaleriaTitle ref={ref2}>Quem somos</GaleriaTitle>
              <Sub>
                A trajetória da Sweet Chef começou com uma paixão infalível de
                Luciana Santana pela arte culinária, levando-a a aperfeiçoar
                suas habilidades em confeitaria através de cursos. Em 2014,
                Luciana se formou em Gastronomia na faculdade Anhanguera. Com
                determinação e criatividade, ela iniciou seu próprio negócio de
                confeitaria, conquistando gradualmente uma clientela fiel
                através de bolos e doces personalizados. A inovação constante, o
                compromisso com ingredientes de alta qualidade e um senso
                aguçado de estética transformaram sua pequena confeitaria em um
                empreendimento de sucesso, onde a satisfação do cliente e a
                felicidade através de sobremesas deliciosas são os princípios
                norteadores de sua jornada.
              </Sub>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
              <img
                style={{
                  width: "fit-content",
                  height: "600px",
                  borderRadius: "10px",
                }}
                src="src/assets/foto-lu.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 100, marginBottom: 30 }}>
        <GaleriaTitle ref={ref}>Perguntas Frequentes</GaleriaTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 25,
          }}
        >
          {faqData.map((faq) => (
            <FaqCard>
              <Card key={faq.key} faq={faq} />
            </FaqCard>
          ))}
        </div>
      </div>

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
