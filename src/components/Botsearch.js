import { useNavigate } from "react-router-dom";
const Botsearch = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const textareaValue = document.querySelector(".Botsearch-input-box").value;
    const textToPass = textareaValue; // Replace with actual text or data
    navigate("/generate", { state: { textData: textToPass } });
  };

  return (
    <>
      <div class="container">
        <header>
          <h1>Hello! I am Uptoskills AI</h1>
          <p>
            Paste a job description/write a hiring requirement and I'll generate
            the best relevant search
          </p>
        </header>
        <main>
          <h2>Job description</h2>
          <form action="">
            <label for="jobDescription"></label>
            <textarea className="Botsearch-input-box" name="" id=""></textarea>
            <div class="btn">
              <button type="reset">Reset</button>
              <button onClick={handleClick}>Generate search</button>
            </div>
          </form>
        </main>
      </div>

      {/* <label>Type you job description</label>
      <br />
      <textarea className="Botsearch-input-box" name="" id=""></textarea>
      <br />
      <button onClick={handleClick}>Generate search</button> */}
    </>
  );
};

export default Botsearch;
