import React from 'react'
import { CSSTransition } from "react-transition-group"
import './style.css'
import images from './backgroundimages.jsx'
export default function App() {
    const [quote, setQuote] = React.useState(
      {
        text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
        author: "Thomas Edison",
      },
    );
  const [randomQuote, setRandomQuote] = React.useState([])
  const [inProp, setInProp] = React.useState({
    state: false
  });
  const [switchMode, setSwitchMode] = React.useState({
    mode: true
  })
  const imageIndex =switchMode.mode? Math.floor(Math.random() * 10): Math.floor(Math.random() * 9) + 10
  const [bImage, setBImage] = React.useState({
    index: imageIndex
  });
    React.useEffect(() => {
      fetch("https://type.fit/api/quotes")
        .then((res) => res.json())
        .then((ans) => setRandomQuote(ans))
    }, [])
    function changeSwitchMode() {
      setSwitchMode((prevState) => ({
        ...prevState,
        mode: !switchMode.mode,
      }));
      // console.log(switchMode.mode);
      setBImage((prevBImage) => ({
        ...prevBImage,
        index: !switchMode.mode
          ? Math.floor(Math.random() * 10)
          : Math.floor(Math.random() * 9) + 10,
      }));
    }
  function getNewQuote() {
    const randomNumber = Math.floor(Math.random() * randomQuote.length)
    setQuote(randomQuote[randomNumber])
    setInProp((prevState) => ({ ...prevState, state: !inProp.state }));
    setBImage((prevBImage) => ({
      ...prevBImage,
      index: imageIndex
    }));
  }
  // const index = bImage.imageIndex
  const backgroundStyle = {
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${images[bImage.index].img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'all .4s',
  };
    return (
      <div className='container' style={backgroundStyle} >
        <main id="quote-box" className={switchMode.mode?'':'light'}>
            <div className="toggler">
              <p className="toggler--light">Dark</p>
            <div className="toggler--slider" onClick={changeSwitchMode}>
                <div className="toggler--slider--circle"></div>
              </div>
              <p className="toggler--dark">Light</p>
            </div>
          <blockquote id="text">
            <CSSTransition in={inProp.state} timeout={2000} classNames="my-node">
              <q id='new-quote'>{quote.text}</q>
            </CSSTransition>
          </blockquote>
          <CSSTransition in={inProp} timeout={2000} classNames="my-node">
            <section id="author">-{quote.author}</section>
          </CSSTransition>
          <section id="btns">
            <button id="new-quote-btn" onClick={getNewQuote} className="btn">
              GET QUOTE
            </button>
            <button className="btn" id="tweet-quote-btn">
              <a
                href={`https://twitter.com/intent/tweet?text=${quote.text} -${quote.author}`}
                id="tweet-quote"
                target="_top"
              >
                TWEET QUOTE
              </a>
            </button>
          </section>
        </main>
      </div>
    ); 
}