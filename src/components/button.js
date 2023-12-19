import ButtonStyle from "./modules/button.module.css";
import Chemical from './assets/chemical.svg';

const Button = ({icon, text, handleClick, type, defaultClicked}) => {
  return (
    <div className={ButtonStyle.buttonElement}>
      <h1 id="button" tipo={type} onClick={() => {handleClick(type)}} className={`${ButtonStyle.BUTTON} ${defaultClicked ? "clicked": ""}`}>{icon === "+" ? "+" : <img className={`${ButtonStyle.svg} ${ButtonStyle[type]}`} src={Chemical} alt="img"/>}</h1>
      <h4>{text}</h4>
    </div>
  );
};

export default Button;
