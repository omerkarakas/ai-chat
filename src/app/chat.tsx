"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Theme } from "react-daisyui";

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const handleToggle = (e: any) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme || "light");
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document
      .querySelector("html")
      ?.setAttribute("data-theme", localTheme || "light");
  }, [theme]);

  return (
    <Theme dataTheme={theme || "light"}>
      <div
        className={`flex flex-col gap-6 items-stretch w-[calc(100%-4rem)] lg:w-1/2 border border-slate-100 mx-auto p-4 m-4 relative`}
      >
        <label className="swap swap-rotate self-end absolute top-4 right-4">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === "light" ? false : true}
            onChange={handleToggle}
          />

          {/* sun icon */}
          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <h1 className="text-2xl">AI CHAT App</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="join flex ">
            <input
              className="input input-bordered join-item flex-grow"
              placeholder="Your Question"
              value={input}
              onChange={handleInputChange}
            />
            <button className="btn join-item rounded-r-full w-1/5">Ask</button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`w-3/4 card rounded-box p-4 shadow-md shadow-slate-500 ${
                m.role === "user"
                  ? "self-start bg-slate-200 rounded-tl-none"
                  : "self-end bg-slate-300 rounded-tr-none"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
      </div>
    </Theme>
  );
}
