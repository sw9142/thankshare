import React, { useState, useEffect } from "react";
import Axios from "axios";
import BibleSearch from "./BibleSearch"
import "./BibleToday.css"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function BibleToday({ LoginUser }) {
  const [GetScript, setGetScript] = useState("");
  const [ScriptDB, setScriptDB] = useState("");

  useEffect(() => {

    refreshScript();
  }, []);

const adminUserId="60d0c2c0ca120965d1594a41"


function getScriptFromChild (text)  {
  setGetScript(text);
}


  const refreshScript = () => {
    Axios.post("api/bible/getscript", { userId: adminUserId }).then((res) => {
      if (res.data.success) {
       
        setScriptDB(res.data.script.script);

      } else {
        alert("err!", res.data.err);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

        Axios.post("api/bible/updateBible", {
          script: GetScript,
          userId: LoginUser.id,
        }).then((res) => {
          if (res.data.success) {
            console.log("success! updating DB", res.data.script);
            setScriptDB(res.data.script.script);
            refreshScript();
          } else {
            alert("err!", res.data.err);
          }
        });
  };

  return (
    <div className="bibletoday_container">
      <div className="bibletoday_title">
      오늘의 말씀
      </div>
      {LoginUser.isAdmin && (
       <BibleSearch getScriptFromChild={getScriptFromChild} />
      )}
      { GetScript &&
           <> 
           <div dangerouslySetInnerHTML={{ __html: GetScript }} style={{fontSize: "1.2rem", padding:"1rem"}}></div>     
           <Button 
            onClick={onSubmit} 
            variant="contained" 
            color="primary" 
            size="small"
            className="button_publish"
            >Publish</Button>
          </>
      }


        <div>
        <Card className="card"> 
        <CardContent className="foundscript" >
          <div dangerouslySetInnerHTML={{ __html: ScriptDB }}></div>  
        </CardContent>
        </ Card>
        </div>
       
    </div>
  );
}

export default BibleToday;
