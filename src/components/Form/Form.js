import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Form = () => {
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [urlCopied, setUrlCopied] = useState(false);
  const [optionsAreHidden, setOptionsAreHidden] = useState(true);
  const [isSubmitting, setIsSumbitting] = useState(false);
  const [selectedType, setSelectedType] = useState("killOnFirstReq");
  const [disableCreateMessage, setDisableCreateMessage] = useState(false);
  const [isAnonMessage, setIsAnonMessage] = useState(true);
  const [charsLeft, setCharsLeft] = useState(3000);
  const [inputData, setInputData] = useState({
    textContent: "",
    name: "",
    aliveFor: {
      hrs: 0,
      min: 2,
      sec: 0,
    },
    options: {
      killOnFirstReq: true,
      startTimerOnFirstReq: false,
      startImmediately: false,
    },
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSumbitting(true);
      const url =
        process.env.NODE_ENV === "production"
          ? "/api/post"
          : "http://localhost:5000/api/post";
      const postMessage = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const response = await postMessage.json();

      if (response.success) {
        setUrl(response.item.url);
        setError("");
        setDisableCreateMessage(true);
        resetForm();
      } else {
        setError(response.message);
        setUrl("");
      }
      setIsSumbitting(false);
    } catch (error) {
      setError("Something went wrong when creating your message");
      setUrl("");
      setIsSumbitting(false);
    }
  };

  const onTypeChange = (e) => {
    setSelectedType(e.target.value);

    setInputData({
      ...inputData,
      options: {
        killOnFirstReq: e.target.value === "killOnFirstReq",
        startTimerOnFirstReq: e.target.value === "startTimerOnFirstReq",
        startImmediately: e.target.value === "startImmediately",
      },
    });
  };

  const resetForm = () => {
    document.querySelector(".input-textContent").innerHTML = "";

    setInputData({
      ...inputData,
      textContent: "",
    });

    setIsAnonMessage(true);
    setCharsLeft(3000);
  };

  const isEmpty = () => {
    if (charsLeft === 3000) {
      setError("Text field can't be empty!");
      return true;
    } else {
      setError("");
      return false;
    }
  };

  const isTooLong = () => {
    if (charsLeft < 0) {
      setError("Your message is too long!");
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <form
          aria-label="Create message"
          onSubmit={(e) => {
            e.preventDefault();

            if (!isEmpty() && !isTooLong()) {
              handleOnSubmit(e);
            }
          }}
        >
          <div className="form-section">
            <label htmlFor="input-textContent" className="messageLabel">
              Message:
            </label>
            <div className="form-inputWrapper">
              <div className="input-textContentWrapper">
                <span
                  contentEditable={true}
                  className="input-textContent"
                  type="text"
                  role="textbox"
                  id="input-textContent"
                  aria-label="Create message textbox"
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertHTML", false, text);

                    setInputData({
                      ...inputData,
                      textContent: e.currentTarget.textContent,
                    });
                    setError("");
                    setCharsLeft(3000 - e.currentTarget.textContent.length);
                  }}
                  onInput={(e) => {
                    setInputData({
                      ...inputData,
                      textContent: e.currentTarget.textContent,
                    });
                    setError("");
                    setCharsLeft(3000 - e.currentTarget.textContent.length);
                  }}
                ></span>
                <span className="input-charsleft">{charsLeft} / 3000</span>
              </div>
              <p className="form-settingsFeedback">
                <i>
                  {" "}
                  The message will self-destruct after:
                  <span>&nbsp;</span>
                  <strong>
                    {inputData.aliveFor.hrs > 0
                      ? `${inputData.aliveFor.hrs} hour(s)`
                      : ""}
                    {inputData.aliveFor.hrs > 0 && inputData.aliveFor.min
                      ? ", "
                      : ""}
                    {inputData.aliveFor.min > 0
                      ? `${inputData.aliveFor.min} minute(s)`
                      : ""}
                    {inputData.aliveFor.min > 0 && inputData.aliveFor.sec
                      ? ", "
                      : ""}
                    {inputData.aliveFor.sec > 0
                      ? `${inputData.aliveFor.sec} second(s)`
                      : ""}
                  </strong>
                </i>
                <i>
                  {" "}
                  Message type:
                  <span>&nbsp;</span>
                  <strong>
                    {inputData.options.killOnFirstReq ? "Private Message" : ""}
                    {inputData.options.startTimerOnFirstReq
                      ? "Triggered Public Message"
                      : ""}
                    {inputData.options.startImmediately ? "Public Message" : ""}
                  </strong>
                </i>
              </p>
            </div>
          </div>

          <div
            className={`form-anonymous ${
              !isAnonMessage ? "form-anonymous--isExtended" : ""
            }`}
            aria-hidden={isAnonMessage ? true : false}
          >
            <div className="form-checkboxWrapper">
              <input
                className="form-checkbox"
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={isAnonMessage}
                onChange={() => setIsAnonMessage(!isAnonMessage)}
              />
              <label htmlFor="anonymous">Anonymous message</label>
            </div>
            <input
              className="form-nameField"
              type="text"
              placeholder="Enter a name.."
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>

          <button
            className="button-styled input-button"
            onClick={(e) => {
              e.preventDefault();
              setOptionsAreHidden(!optionsAreHidden);
            }}
          >
            Edit message options
          </button>

          <div
            className={`form-options ${
              optionsAreHidden ? "form-options--isHidden" : ""
            }`}
            aria-hidden={optionsAreHidden ? true : false}
          >
            <div className="form-section">
              <label
                htmlFor="input-timeSelect"
                className="input-timeSelect-label"
              >
                Self-destruct after:
              </label>
              <select
                name="input-timeSelect-hrs"
                id="input-timeSelect-hrs"
                className="input-timeSelect hours"
                defaultValue={inputData.aliveFor.hrs}
                onChange={(e) => {
                  setInputData({
                    ...inputData,
                    aliveFor: {
                      hrs: Number(e.target.value),
                      min: inputData.aliveFor.min,
                      sec: inputData.aliveFor.sec,
                    },
                  });
                }}
              >
                {[...Array(25)].map((number, i) => (
                  <option key={`hours-${i}`} value={i}>
                    {i} hours
                  </option>
                ))}
              </select>

              <select
                name="input-timeSelect-min"
                id="input-timeSelect-min"
                className="input-timeSelect"
                defaultValue={inputData.aliveFor.min}
                onChange={(e) => {
                  setInputData({
                    ...inputData,
                    aliveFor: {
                      hrs: inputData.aliveFor.hrs,
                      min: Number(e.target.value),
                      sec: inputData.aliveFor.sec,
                    },
                  });
                }}
              >
                {[...Array(60)].map((number, i) => (
                  <option key={`minutes-${i}`} value={i}>
                    {i} min
                  </option>
                ))}
              </select>

              <select
                name="input-timeSelect-sec"
                id="input-timeSelect-sec"
                className="input-timeSelect"
                defaultValue={inputData.aliveFor.sec}
                onChange={(e) => {
                  setInputData({
                    ...inputData,
                    aliveFor: {
                      hrs: inputData.aliveFor.hrs,
                      min: inputData.aliveFor.min,
                      sec: Number(e.target.value),
                    },
                  });
                }}
              >
                {[...Array(60)].map((number, i) => (
                  <option key={`seconds-${i}`} value={i}>
                    {i} sec
                  </option>
                ))}
              </select>
            </div>

            <div className="form-section form-section-radio">
              <label
                htmlFor="input-typeSelect"
                className="input-typeSelect-label"
              >
                Message type:
              </label>

              <div className="form-radio-wrapper">
                <div className="form-radio-itemWrapper">
                  <input
                    type="radio"
                    className="form-radio"
                    id="form-radio-secret"
                    name="secret message"
                    value="killOnFirstReq"
                    checked={selectedType === "killOnFirstReq"}
                    onChange={(e) => onTypeChange(e)}
                  />
                  <label htmlFor="form-radio-secret">
                    Private Message (can be opened once, and only once)
                  </label>
                </div>

                <div className="form-radio-itemWrapper">
                  <input
                    type="radio"
                    className="form-radio"
                    id="form-radio-countdown"
                    name="Public message"
                    value="startImmediately"
                    checked={selectedType === "startImmediately"}
                    onChange={(e) => onTypeChange(e)}
                  />
                  <label htmlFor="form-radio-countdown">
                    Public Message (visible to anyone with the unique url, timer
                    starts immediately)
                  </label>
                </div>

                <div className="form-radio-itemWrapper">
                  <input
                    type="radio"
                    className="form-radio"
                    id="form-radio-triggered"
                    name="Triggered Message"
                    value="startTimerOnFirstReq"
                    checked={selectedType === "startTimerOnFirstReq"}
                    onChange={(e) => onTypeChange(e)}
                  />
                  <label htmlFor="form-radio-triggered">
                    Triggered Public Message (visible to anyone with the unique
                    url, timer starts when the first person opens the message)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="input-buttonWrapper">
            <button
              type="submit"
              className="button-styled input-button"
              disabled={disableCreateMessage}
            >
              Create message
            </button>
          </div>
        </form>

        <div className="form-feedback">
          {error && <div className="form-feedback-error">{error}</div>}
          {url && (
            <div className="form-feedback-success">
              <div className="form-feedback-success-top">
                <svg
                  height="512pt"
                  viewBox="0 0 512 512"
                  width="512pt"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m369.164062 174.769531c7.8125 7.8125 7.8125 20.476563 0 28.285157l-134.171874 134.175781c-7.8125 7.808593-20.472657 7.808593-28.285157 0l-63.871093-63.875c-7.8125-7.808594-7.8125-20.472657 0-28.28125 7.808593-7.8125 20.472656-7.8125 28.28125 0l49.730468 49.730469 120.03125-120.035157c7.8125-7.808593 20.476563-7.808593 28.285156 0zm142.835938 81.230469c0 141.503906-114.515625 256-256 256-141.503906 0-256-114.515625-256-256 0-141.503906 114.515625-256 256-256 141.503906 0 256 114.515625 256 256zm-40 0c0-119.394531-96.621094-216-216-216-119.394531 0-216 96.621094-216 216 0 119.394531 96.621094 216 216 216 119.394531 0 216-96.621094 216-216zm0 0" />
                </svg>
                {!urlCopied ? (
                  <span>
                    {" "}
                    Message created! <strong>(click to copy share link)</strong>
                  </span>
                ) : (
                  <span>Link copied!</span>
                )}
              </div>
              <CopyToClipboard text={url} onCopy={() => setUrlCopied(true)}>
                <span className="form-feedback-success-bottom">{url}</span>
              </CopyToClipboard>
            </div>
          )}
          {isSubmitting && <div className="div">Creating message..</div>}
        </div>
      </div>
    </div>
  );
};

export default Form;
