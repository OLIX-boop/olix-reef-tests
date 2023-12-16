import ButtonStyle from "./button.module.css";
import Chemical from './assets/chemical.svg';

const Button = ({icon, text, handleClick, type}) => {
  
  return (
    <div className={ButtonStyle.buttonElement}>
      <h1 onClick={() => {handleClick(type)}} className={ButtonStyle.BUTTON}>{icon === "+" ? "+" : <img className={`${ButtonStyle.svg} ${ButtonStyle[type]}`} src={Chemical} alt="img"/>}</h1>
      <h4>{text}</h4>
    </div>
  );
};

export default Button;
