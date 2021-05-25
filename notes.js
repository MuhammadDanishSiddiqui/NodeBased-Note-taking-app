const fs=require("fs")
const chalk=require("chalk")

const addNote=(title,body)=>{
const notes=loadNotes()
const duplicateNote=notes.find((note)=>{
    return note.title===title
})
if(!duplicateNote){
    notes.push({
        title,
        body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse.bold("New note added!"))
}
else{
    console.log(chalk.red.inverse.bold("Title already taken!"))
}

}

const removeNote=title=>{
    const notes=loadNotes()
    const noteToRemove=notes.findIndex((note)=>{
        return note.title===title
    })
   
    if(noteToRemove===-1){
        console.log(chalk.red.inverse.bold("No note found"))
       }
       else{
           notes.splice(noteToRemove,1)
           saveNotes(notes)
           console.log(chalk.green.inverse.bold("Note removed"))
       }
}


const listNotes=()=>{
    const notes=loadNotes()
    if(notes.length===0)
    {
        console.log(chalk.red.bold("Please add some notes..."))
    }
    else{
        console.log(chalk.green.bold("your notes:"))
        notes.forEach(note => {
            console.log(note.title)
        });
    }
  
}

const readNote=(title)=>{
    const notes=loadNotes()
    const note=notes.find((note)=>{
        return note.title===title
    })

    if(note){
        console.log("title:"+note.title)
        console.log("body:"+note.body)
    }
    else{
        console.log(chalk.red.bold("No such note found!"))
    }
  
}

const loadNotes=()=>{
    try{
        const notes=fs.readFileSync("notes.json","utf-8")
        return JSON.parse(notes)
    }
  catch{
      return []
  }
}

const saveNotes=(notes)=>{
 fs.writeFileSync("notes.json",JSON.stringify(notes))
}

module.exports={addNote,removeNote,listNotes,readNote}