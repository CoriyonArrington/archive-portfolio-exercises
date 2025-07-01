// components/common/faq-card.tsx
type FAQ = {
    id: string;
    question: string;
    answer: string;
  };
  
  const FaqCard = ({ question, answer }: FAQ) => {
    return (
      <div className="faq-card">
        <h3>{question}</h3>
        <p>{answer}</p>
      </div>
    );
  };
  
  export default FaqCard;
  