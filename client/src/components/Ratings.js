import { useState } from "react";
import '../App.css';
import { FaStar } from "react-icons/fa";
import '../queries';

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
      resize: "none",
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    }
    
};

const colors = {
    yellow: "#fcba03",
    grey: "#a9a9a9"
    
};

function App() {
  const [rating, setRating] = useState(undefined);
  const [hoverValue, setHoverValue] = useState(undefined);
  
  const stars = Array(5).fill(0);

  const handleClick = value => {
    setRating(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(null)
  }


  return (
    <div style={styles.container}>
      <h2> Post a review for the product </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <label>
            <input 
            type="radio" 
            name="rating" 
            value={rating} 
            onClick={ () => setRating(rating)}/>

            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || rating) > index ? colors.yellow : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
        </label>
          )
        })}
      </div>
      <textarea placeholder="How was your experience?" style={styles.textarea}/>

      <button style={styles.button}> Submit</button>
      
    </div>
  );
};

export default App;

