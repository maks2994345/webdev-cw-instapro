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

    const likesCount = post.likes.length;
    let likesText = '';

    if (likesCount === 0) {
      likesText = '0';
    } else if (likesCount === 1) {
      likesText = `${post.likes[0].name}`;
    } else {
      likesText = `${post.likes[0].name} и еще ${likesCount - 1}`;
    }

    postLikesText.textContent = likesText;
  });
}

export function sanitizeInput(input) {
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
}

export function safePrint(text){
  return text.replaceAll('<','&lt;' ).replaceAll('>','&gt');
}
