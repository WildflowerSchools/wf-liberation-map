import React from "react"
import * as ReactDOMClient from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

// Allow iFrame navigation by setting document.domain to the host domain
// if (window !== window.top) {
//   document.domain = new URL(document.referrer).hostname //window.top.location.host
// }

const rootContainer = document.getElementById("root")
const root = ReactDOMClient.createRoot(rootContainer)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
