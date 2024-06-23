import { renderUploadImageComponent } from './upload-image-component.js';
import { sanitizeInput } from "../helpers.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = ''
  let description = ''
  const render = () => {
    const appHtml =  `
    <div class="page-container">
    <div class="header-container"></div>
      <div class="form">
          <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
          <div class="upload-image-container">
          </div>
              <label>Опишите фотографию:
                  <textarea class="input textarea" rows="4" id="description"></textarea>
              </label>
                  <button class="button" id="add-button">Добавить</button>
              </div>
          </div>
      </div>
   </div>
  `;

    appEl.innerHTML = appHtml;

    const textArea = document.querySelector('.textarea')

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl){
        imageUrl = newImageUrl;
      }
    })

    textArea.addEventListener('input', (e) => {
      description = sanitizeInput(e.target.value);
    })

    document.getElementById("add-button").addEventListener("click", () => {
      if(!imageUrl){
        alert('Добавьте картинку')
        return
      }
      if(!description){
        alert('Добавьте описание к картинке')
        return;
      }
      onAddPostClick({
        description: description,
        imageUrl: imageUrl
      })
      });
  };

  render();
}
