import React, { useState } from "react";
import { Configuration, OpenAIApi } from 'openai';
import { BeatLoader } from "react-spinners";
import "./App.css";
// import translate from "google-translate-open-api";

<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />

const App = () => {

  const [formData, setFormData] = useState({ language: "Spanish", message: "" });

  const [error, setError] = useState("");

  const [showNotification, setShowNotification] = useState(false);

  const [translation, setTranslation] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  /* 
   * OPEN AI API Request
   */

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  /* 
   * OPEN AI API Request
   */

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    setError("");
  };

  const translate = async () => {
    const { language, message } = formData;
    // open ai configuration
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        `Translate this into ${language}: ${message}`,
      temperature: 0.3,
      max_tokens: 2000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // console.log(response.data.choices[0].text.trim());
    const translationText = response.data.choices[0].text.trim();
    setIsLoading(false);
    setTranslation(translationText);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError('NOTE: Please enter the text to be translated!');
      return;
    }
    setIsLoading(true);
    translate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translation)
      .then(() => displayNotification())
      .catch((err) => console.error("Failed to copy: ", err))
  };

  const displayNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  }

  return <div className='container'>

    <div className="banner" style={{ maxWidth: '600px', maxHeight: '100px', margin: '0em 0' }}>
      <img src="/public/banner.png" alt="banner" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </div>

    <br />

    <hr class="separator" />

    <br />

    {/* <h1>Translator</h1> */}

    <form onSubmit={handleOnSubmit}>

      <textarea
        name="message"
        placeholder="Enter text here (up to about 1000 words supported)"
        onChange={handleInputChange}
      ></textarea>

      {error && <div className="error">{error}</div>}

      {/* <br/> */}

      <div class="parent">
        <div class="separatorShort"></div>
      </div>


      <h2>Select target language to translate</h2>

      {/* * Line 1 */}
      <div className="targetLanguages">
        <input
          type='radio'
          id='Spanish'
          name="language"
          value='Spanish'
          defaultChecked={formData.language}
          onChange={handleInputChange}
        />
        <label htmlFor='Spanish'><span>Spanish</span></label>

        <input
          type='radio'
          id='French'
          name="language"
          value='French'
          onChange={handleInputChange}
        />
        <label htmlFor='French'><span>French</span></label>

        <input
          type='radio'
          id='English'
          name="language"
          value='English'
          onChange={handleInputChange}
        />
        <label htmlFor='English'><span>English</span></label>
      </div>

      {/* * Line 2 */}
      <div className="targetLanguages">


        <input
          type='radio'
          id='Chinese-Simplified'
          name="language"
          value='Chinese-Simplified'
          onChange={handleInputChange}
        />
        <label htmlFor='Chinese-Simplified'><span>Chinese (Simplified)</span></label>

        <input
          type='radio'
          id='Chinese-Traditional'
          name="language"
          value='Chinese-Traditional'
          onChange={handleInputChange}
        />
        <label htmlFor='Chinese-Traditional'><span>Chinese (Traditional)</span></label>

        <input
          type='radio'
          id='Japanese'
          name="language"
          value='Japanese'
          onChange={handleInputChange}
        />
        <label htmlFor='Japanese'><span>Japanese</span></label>

      </div>

      {/* * Line 3 */}
      <div className="targetLanguages">

        <input
          type='radio'
          id='Arabic'
          name="language"
          value='Arabic'
          onChange={handleInputChange}
        />
        <label htmlFor='Arabic'><span>Arabic</span></label>

        <input
          type='radio'
          id='Russian'
          name="language"
          value='Russian'
          onChange={handleInputChange}
        />
        <label htmlFor='Russian'><span>Russian</span></label>

        <input
          type='radio'
          id='Korean'
          name="language"
          value='Korean'
          onChange={handleInputChange}
        />
        <label htmlFor='Korean'><span>Korean</span></label>

      </div>

      {/* * Line 4 */}
      <div className="targetLanguages">

        <input
          type='radio'
          id='Hindi'
          name="language"
          value='Hindi'
          onChange={handleInputChange}
        />
        <label htmlFor='Hindi'><span>Hindi</span></label>

        <input
          type='radio'
          id='Portuguese'
          name="language"
          value='Portuguese'
          onChange={handleInputChange}
        />
        <label htmlFor='Portuguese'><span>Portuguese</span></label>

        <input
          type='radio'
          id='German'
          name="language"
          value='German'
          onChange={handleInputChange}
        />
        <label htmlFor='German'><span>German</span></label>

      </div>


      <button type="submit">Translate</button>

      <div className="translation">
        <div className="copy-btn" onClick={handleCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>

        </div>
        {isLoading ? <BeatLoader size={12} color={'gray'} /> : translation}
      </div>

      <div className={`notification ${showNotification ? "active" : ""}`}>
        Copied to clipboard!
      </div>
    </form>
  </div>;
}

export default App