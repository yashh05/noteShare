import React, { useCallback,useEffect,useState } from 'react'
import Quill from 'quill'
import {useParams} from "react-router-dom"
import {io} from "socket.io-client"
import "../styles/textEditor.css"
import "quill/dist/quill.snow.css"

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS=[
    [ {header:[1,2,3,4,5,6,false]} ],
    [{font:[]}],
    [{list:"ordered"},{list:"bullet"}],
    ["bold","italic","underline"],
    [{color:[]},{background:[]}],
    [{script:"sub"},{script:"super"}],
    [{align:[]}],
    ["image","blockquote","code-block"],
    ["clean"],

]


function TextEditor() {
const userId=JSON.parse(localStorage.getItem("user")).userId
const { fileId:documentId } = useParams()
const [quill,setQuill]=useState()
const [socket,setSocket]=useState()

    useEffect(()=>{
        const s=io("http://localhost:8080")
        setSocket(s)
        return ()=>{
          s.disconnect()
        }
        },[])

  useEffect(() => {
    // console.log(quill);
    if (socket == null || quill == null) return
    console.log(documentId);
    socket.emit("get-document", {userId,documentId})

    socket.on("load-document", document => {
      console.log("load document", document);
      quill.setContents(document)
      quill.enable()
    })

    socket.on("wrong-document",({error})=>{
       console.log(document);
    })

  }, [socket, quill, userId, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      // console.log(quill.getContents());
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta) => {
      console.log("receive ",delta);
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
       socket.off("receive-changes", handler)
    }
  }, [socket, quill])
  // useEffect(()=>{
  //   if(socket==null || quill==null) return

  //   const handler = () => {
  //       alert("user is not allowed")
  //   }
  //   socket.on("user-not-allowed", handler)
  // })

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      console.log(source);
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])

  return (
    <div className='container' ref={wrapperRef}></div>
  )
}

export default TextEditor