import { useState } from "react";

import sun from "./images/icon-sun.svg";
import moon from "./images/icon-moon.svg";

const App = () => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(list);
  const [dark, setDark] = useState(true);

  function toggleDark() {
    if (dark) {
      setDark(false);

      document.body.classList.add("light");
    } else {
      setDark(true);

      document.body.classList.remove("light");
    }
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      if (e.target.value.trim() !== "") {
        const arr = [...list];
        arr.push({
          content: e.target.value,
          done: false,
        });

        e.target.value = "";
        setList(arr);
        setShow(arr);
      }
    }

    const input = document.querySelector("input[type='text']");
    if (e.type === "click" && input.value.trim() !== "") {
      const arr = [...list];
      arr.push({
        content: input.value,
        done: false,
      });

      input.value = "";
      setList(arr);
      setShow(arr);
    }
  }

  function handleChangeChk(e) {
    const index = parseInt(e.target.attributes.index.value);

    const arr = [...list];
    arr[index].done = e.target.checked;

    setList(arr);
  }

  function listAll() {
    document.querySelectorAll(".mid p").forEach((elm, i) => {
      if (i === 0) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });

    document.querySelectorAll(".bottomMid p").forEach((elm, i) => {
      if (i === 0) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });
    setShow(list);
  }

  function listActive() {
    document.querySelectorAll(".mid p").forEach((elm, i) => {
      if (i === 1) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });
    document.querySelectorAll(".bottomMid p").forEach((elm, i) => {
      if (i === 1) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });

    const arr = list.filter((x) => !x.done);
    setShow(arr);
  }

  function listCompleted() {
    document.querySelectorAll(".mid p").forEach((elm, i) => {
      if (i === 2) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });
    document.querySelectorAll(".bottomMid p").forEach((elm, i) => {
      if (i === 2) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });

    const arr = list.filter((x) => x.done);
    setShow(arr);
  }

  function removeDone() {
    const arr = list.filter((x) => !x.done);

    setList(arr);
    setShow(arr);
    document.querySelectorAll(".mid p").forEach((elm, i) => {
      if (i === 0) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });
    document.querySelectorAll(".bottomMid p").forEach((elm, i) => {
      if (i === 0) {
        elm.classList.add("active");
      } else {
        elm.classList.remove("active");
      }
    });
  }

  function handleDragStart(e) {
    e.target.classList.add("draging");
  }
  function handleDragStop(e) {
    e.target.classList.remove("draging");
  }
  function handleDragOver(e) {
    e.preventDefault();
    const draggable = document.querySelector(".draging");
    const afterElm = getDragAfterElm(e.clientY);

    if (afterElm === undefined) {
      document.querySelector(".todos").append(draggable);
    } else {
      document.querySelector(".todos").insertBefore(draggable, afterElm);
    }
  }

  function getDragAfterElm(y) {
    const elements = [...document.querySelectorAll(".todo:not(.draging)")];

    return elements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  return (
    <div className="main">
      <div className="bg"></div>

      <div className="container">
        <div className="header">
          <h1>TODO</h1>
          <div className="svg" onClick={toggleDark}>
            {dark ? (
              <img src={sun} alt="sun icon" />
            ) : (
              <img src={moon} alt="moon icon" />
            )}
          </div>
        </div>

        <div className="input">
          <input type="checkbox" />
          <div className="checkPar" onClick={handleEnter}>
            <span
              className="checkmark"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 2,
                }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z"
                />
              </svg>
            </span>
          </div>
          <input
            type="text"
            placeholder="Create a new todo..."
            onKeyPress={handleEnter}
          />
        </div>

        <div className="list" onDragOver={handleDragOver}>
          {show.length === 0 && (
            <div className="todo">
              <p
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  width: "100%",
                  opacity: 0.75,
                }}
              >
                Empty
              </p>
            </div>
          )}

          <div className="todos">
            {show.map((x, i) => (
              <div
                className={`todo  ${x.done ? "checked" : ""}`}
                key={i}
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragStop}
              >
                <label className="checkPar">
                  <input
                    type="checkbox"
                    checked={x.done}
                    onChange={handleChangeChk}
                    index={i}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{x.content}</p>
              </div>
            ))}
          </div>

          <div className="listFooter">
            <div className="left">{list.length} items left</div>
            <div className="mid">
              <p className="active" onClick={listAll}>
                All
              </p>
              <p onClick={listActive}>Active</p>
              <p onClick={listCompleted}>Completed</p>
            </div>
            <div className="right" onClick={removeDone}>
              Clear Completed
            </div>
          </div>
        </div>
        <div className="bottomMid">
          <p className="active" onClick={listAll}>
            All
          </p>
          <p onClick={listActive}>Active</p>
          <p onClick={listCompleted}>Completed</p>
        </div>

        <p>Drag and drop to reorder the list</p>
      </div>
    </div>
  );
};

export default App;
