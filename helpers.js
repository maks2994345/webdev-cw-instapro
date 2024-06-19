export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function setLike({
  like,
  likeButton,
  postLikesText,
  postId,
  token,
  user,
}) {
  if (!user) {
    alert('Лайкать посты могут только авторизованные пользователи!');
    return;
  }
  const isLiked = likeButton.dataset.isLiked === 'true' ? true : false;
  like({
    postId,
    token,
    isLiked,
  }).then((post) => {
    const likeImage = likeButton.querySelector('img');

    likeButton.dataset.isLiked = post.isLiked;

    likeImage.src = `./assets/images/${
      !isLiked ? `like-active.svg` : `like-not-active.svg`
    }`;

    postLikesText.textContent = `${post.likes.length}`;
  });
}

