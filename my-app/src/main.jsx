import React from "react"
import { createRoot } from "react-dom/client"
import {Provider} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




import App from "./App"

import "./index.css"
import { store } from "./app/store"

const container = document.getElementById("root")

  const root = createRoot(container)

  root.render(
      <Provider store={store}>
   
        <App />
        </Provider>
     
  )

  
