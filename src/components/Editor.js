import ReactQuill from "react-quill";
import { useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import io from "socket.io-client";
import { initSocket } from "../socket";

const Editor = () => {
  const [content, setContent] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function init() {
      const initialSocket = await initSocket();
      setSocket(initialSocket);

      initialSocket.on("editor-change", (newValue) => {
        setContent(newValue);
      });
    }
    init();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  var options = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ whitespace: ["normal", "pre", "pre-line", "pre-wrap"] }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];
  const module = {
    toolbar: options,
  };

  const handleChange = (value) => {
    setContent(value);
    socket.emit("editor-change", value);
  };
  return (
    <>
      <div className="App editorWrap">
        <header className="App-header">
          <h1>Document Editing System</h1>
        </header>
        <ReactQuill
          modules={module}
          theme="snow"
          value={content}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Editor;
