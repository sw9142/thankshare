import React, { useState } from "react";
import BibleSearch from "./BibleSearch.js"

import "./Bible.css"


function Bible() {

  const [GetScript, setGetScript] = useState("");

function getScriptFromChild (text)  {
  setGetScript(text);
}

  return (
        <>
      <BibleSearch getScriptFromChild={getScriptFromChild} />
      <div className="foundscript">
        <div dangerouslySetInnerHTML={{ __html: GetScript }}></div>
      </div>
        </>
  );
}

export default Bible;
