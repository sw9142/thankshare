import React, {useState} from 'react';
import Axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import "./BibleSearch.css"

function BibleSearch(props) {

  const [Book, setBook] = useState("");
  const [Chapter, setChapter] = useState("");
  const [FromVerse, setFromVerse] = useState("");
  const [ToVerse, setToVerse] = useState("");



const onSelectBook = (e) => {
    setBook(e.target.value);
  };
  const onSelectChapter = (e) => {
    setChapter(e.target.value);
  };
  const onSelectVerse = (e) => {
    if (e.target.name === "from") {
      setFromVerse(e.target.value);
    } else if (e.target.name === "to") {
      setToVerse(e.target.value);
    }
  };
  const callBibleAPI = () => {
    Axios.post("api/bible/get", {
      book: Book,
      chapter: Chapter,
      versefrom: FromVerse,
      verseto: ToVerse,
    }).then((res) => {
      if (res.data.success) {
   
        console.log("[bibleSearch]res.data: ", res.data);
        props.getScriptFromChild(res.data.book);
      }
    });
  };


  const onSubmit = (e) => {
    e.preventDefault();

    callBibleAPI();
  };


    return (
        <>      
        <div className="section_bible"> 
            <FormControl className="form_bible" onSubmit={onSubmit}>
            <InputLabel id="demo-simple-select-label">Bible</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Book}
                onChange={onSelectBook}
            >
                <MenuItem value="gen">창세기 (Genesis)</MenuItem>
                <MenuItem value="exo">출애굽기 (Exodus)</MenuItem>
                <MenuItem value="lev">레위기 (Leviticus)</MenuItem>
                <MenuItem value="num">민수기 (Numbers)</MenuItem>
                <MenuItem value="deu">신명기 (Deuteronomy)</MenuItem>
                <MenuItem value="josh">여호수아 (Joshua)</MenuItem>
                <MenuItem value="jdgs">사사기 (Judges)</MenuItem>
                <MenuItem value="ruth">룻기 (Ruth)</MenuItem>
                <MenuItem value="1sm">사무엘상 (1 Samuel)</MenuItem>
                <MenuItem value="2sm">사무엘하 (2 Samuel)</MenuItem>
                <MenuItem value="1ki">열왕기상 (1 Kings)</MenuItem>
                <MenuItem value="2ki">열왕기하 (2 Kings)</MenuItem>
                <MenuItem value="1chr">역대상 (1 Chronicles)</MenuItem>
                <MenuItem value="2chr">역대하 (2 Chronicles)</MenuItem>
                <MenuItem value="ezra">에스랴 (Ezra)</MenuItem>
                <MenuItem value="neh">느헤미야 (Nehemiah)</MenuItem>
                <MenuItem value="est">에스더 (Esther)</MenuItem>
                <MenuItem value="job">욥기 (Job)</MenuItem>
                <MenuItem value="psa">시편 (Psalms)</MenuItem>
                <MenuItem value="prv">잠언 (Proverbs)</MenuItem>
                <MenuItem value="eccl">전도서 (Ecclesiastes)</MenuItem>
                <MenuItem value="ssol">아가 (Songs)</MenuItem>
                <MenuItem value="isa">이사야 (Isaiah)</MenuItem>
                <MenuItem value="jer">예레미야 (Jeremiah)</MenuItem>
                <MenuItem value="lam">예레미야애가 (Lamentations)</MenuItem>
                <MenuItem value="eze">에스겔 (Ezekiel)</MenuItem>
                <MenuItem value="dan">다니엘 (Daniel)</MenuItem>
                <MenuItem value="hos">호세아 (Hosea)</MenuItem>
                <MenuItem value="joel">요엘 (Joel)</MenuItem>
                <MenuItem value="amos">아모스 (Amos)</MenuItem>
                <MenuItem value="obad">오바댜 (Obadiah)</MenuItem>
                <MenuItem value="jonah">요나 (Jonah)</MenuItem>
                <MenuItem value="mic">미가 (Micah)</MenuItem>
                <MenuItem value="nahum">나훔 (Nahum)</MenuItem>
                <MenuItem value="hab">하박국 (Habakkuk)</MenuItem>
                <MenuItem value="zep">스바냐 (Zephaniah)</MenuItem>
                <MenuItem value="hag">학개 (Haggai)</MenuItem>
                <MenuItem value="zep">스가랴 (Zechariah)</MenuItem>
                <MenuItem value="mal">말라기 (Malachi)</MenuItem>
                <MenuItem value="mat">마태복음 (Matthew)</MenuItem>
                <MenuItem value="mark">마가복음 (Mark)</MenuItem>
                <MenuItem value="luke">누가복음 (Luke)</MenuItem>
                <MenuItem value="john">요한복음 (John)</MenuItem>
                <MenuItem value="acts">사도행전 (Acts)</MenuItem>
                <MenuItem value="rom">로마서 (Romans)</MenuItem>
                <MenuItem value="1cor">고린도전서 (1 Corinthians)</MenuItem>
                <MenuItem value="2cor">고린도후서 (2 Corinthians)</MenuItem>
                <MenuItem value="gal">갈라디아서 (Galatians)</MenuItem>
                <MenuItem value="eph">에베소서 (Ephesians)</MenuItem>
                <MenuItem value="phi">빌립보서 (Philippians)</MenuItem>
                <MenuItem value="col">골로새서 (Colossians)</MenuItem>
                <MenuItem value="1th">데살로니가전서 (1 Thessalonians)</MenuItem>
                <MenuItem value="2th">데살로니가후서 (2 Thessalonians)</MenuItem>
                <MenuItem value="1tim">디모데전서 (1 Timothy)</MenuItem>
                <MenuItem value="2tim">디모데후서 (2 Timothy)</MenuItem>
                <MenuItem value="titus">디도서 (Titus)</MenuItem>
                <MenuItem value="phmn">빌레몬서 (Philemon)</MenuItem>
                <MenuItem value="heb">히브리서 (Hebrews)</MenuItem>
                <MenuItem value="jas">야고보서 (James)</MenuItem>
                <MenuItem value="1pet">베드로전서 (1 Peter)</MenuItem>
                <MenuItem value="2pet">베드로후서 (2 Peter)</MenuItem>
                <MenuItem value="1jn">요한일서 (1 John)</MenuItem>
                <MenuItem value="2jn">요한2서 (2 John)</MenuItem>
                <MenuItem value="3jn">요한3서 (3 John)</MenuItem>
                <MenuItem value="jude">유다서 (Jude)</MenuItem>
                <MenuItem value="rev">요한계시록 (Revelation)</MenuItem>
            </Select>
            </FormControl>
        </div>
        <div className="section_inputs">
            <FormControl className="form_inputs" >
                <TextField  
                label="Chapter"    
                type="number"
                placeholder="~장"
                min="1"
                onChange={onSelectChapter} />
        
                <TextField  
                label="From "    
                type="number"
                placeholder="몇절 부터"
                name="from"
                min="1"
                onChange={onSelectVerse} />
                <TextField  
                label="To"    
                type="number"
                placeholder="몇절 까지"
                name="to"
                min="1"
                onChange={onSelectVerse} />
        
                <IconButton 
                color="primary" 
                component="span" 
                onClick={onSubmit} > 
                <SearchIcon size="medium" />
                </IconButton>
            </FormControl>
        </div>
    </>
    )
}

export default BibleSearch
