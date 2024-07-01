import API_KEY from "../utils/constants";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  const { textData } = location.state || { textData: "" };
  const [data, setData] = useState({});
  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  useEffect(() => {
    async function run() {
      const prompt = textData;
      const p1 = `Extract the following details from the job description: Keywords(should contain minimmum 9 keywords related only to the job role specified), Applied Filters (Languages) languages should only contain human speaking languages if nothing mentiones give the default value as english, Current City, Minimum Experience, Maximum Experience, Minimum Annual Salary, Maximum Annual Salary, Highest Education.\n\nJob Description: ${prompt}\n\nFormat the response as a JSON object with the following keys: "keywords", "languages", "city", "min_experience", "max_experience", "min_salary", "max_salary", "education".`;

      const result = await model.generateContent(p1);
      const response = result.response;
      const text = await response.text();

      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}") + 1;
      const jsonText = text.slice(jsonStart, jsonEnd);

      try {
        const jsonData = JSON.parse(jsonText);
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Failed to parse JSON:");
        console.log("Response text was:");
      }
    }

    run().catch(console.error);
  }, []);

  if (Object.keys(data).length === 0) {
    return <h1>fetching</h1>;
  }

  return (
    <>
      <form>
        <label htmlFor="keywords">Keywords:</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.keywords.join(", ")}
        </textarea>
        <br />

        <label htmlFor="applied-filters">Applied Filters (Languages):</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.languages.join(", ")}
        </textarea>
        <br />

        <label htmlFor="current-city">Current City:</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.city}
        </textarea>
        <br />

        <label htmlFor="experience-min">Minimum Experience:</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.min_experience}
        </textarea>
        <br />

        <label htmlFor="experience-max">Maximum Experience:</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.max_experience}
        </textarea>
        <br />

        <label htmlFor="salary-min">Minimum Annual Salary:</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.min_salary}
        </textarea>
        <br />

        <label htmlFor="salary-max">Maximum Annual Salary:</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.max_salary}
        </textarea>
        <br />

        <label htmlFor="highest-education">Highest Education:</label>
        <br />
        <textarea id="keywords" name="keywords">
          {data.education}
        </textarea>
        <br />
      </form>
    </>
  );
};

export default App;
