import React from "react";

interface CallToActionProps {
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  buttonStyle?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  message,
  buttonText,
  onButtonClick,
  backgroundColor = "bg-accent",
  textColor = "text-primary",
  buttonStyle = "bg-white text-accent",
}) => {
  return (
    <section
      className={`${backgroundColor} text-center py-8 rounded shadow-md max-w-5xl mt-6`}
    >
      <h2 className={`text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <p className={`text-md leading-relaxed mb-6 p-4 ${textColor}`}>
        {message}
      </p>
      <button
        onClick={onButtonClick}
        className={`${buttonStyle} font-bold py-3 px-6 rounded shadow-md hover:bg-gray-100 transition`}
      >
        {buttonText}
      </button>
    </section>
  );
};

export default CallToAction;
