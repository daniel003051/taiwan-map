import { createApp } from "vue";
import App from "./App.vue";

kintone.events.on("app.record.index.show", () => {
  const spaceElement = kintone.app.getHeaderMenuSpaceElement()!;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  spaceElement.appendChild(checkbox);

  spaceElement.addEventListener("click", (e: MouseEvent) => {
    const { checked } = e.target as HTMLInputElement
    const el = document.querySelector('#map-app')!
    if (checked) {
      
      createApp(App).mount(el)
      return
    } 

    el.innerHTML = ''
  });
});

// kintone.events.on("app.record.index.show", () => {
//   const el = document.querySelector('#map-app')!
//   createApp(App).mount(el)
// });
