import React, { useState } from "react";
import BibleSearch from "./BibleSearch.js"

import "./Bible.css"

//http://ibibles.net/quote.php?kor-yyy/aa:bb-cc:dd
//http://ibibles.net/quote.php?kor-mat/5:3-12 마태복음 5:3-12
// `https://cors-anywhere.herokuapp.com/${BibleAPI}${Chapter}/1:1-10`

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
