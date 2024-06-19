import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, user } from "../main.js";
import { setLike } from "../helpers.js";
import { like } from "../api.js";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { ru } from 'date-fns/locale'

export function renderPostsPageComponent({ appEl }) {
  const render = () => {
       /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml =
       `<div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${posts
                   .map((post)=> {
                      return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        <img src="./assets/images/${post.isLiked ? `like-active.svg` : `like-not-active.svg`}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${formatDistanceToNow(new Date(post.createdAt), {
                        locale: ru,
                      })}
                    </p>
                  </li>`
  }).join("")}  
  </ul>
  </div>`
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let postLikes of document.querySelectorAll('.post-likes')) {
    const likeButton = postLikes.querySelector('.like-button');
    const postLikesText = postLikes.querySelector('strong');
    const postId = likeButton.dataset.postId;

    likeButton.addEventListener('click', () => {
      setLike({
        like,
        likeButton,
        postLikesText,
        postId,
        token: getToken(),
        user,
      });
    });
  }
  }
 render()
}
