const createHeaderTemplate = (state) => {
  const {headerText} = state;
  return (
    `<input class="header__input" type="text" value="${headerText}">

      <div>
        <button type="button" class="header__button">
          <i class="material-icons">delete</i>
        </button>

        <button type="button" class="header__button">
          <i class="material-icons">exit_to_app</i>
        </button>
    </div>`
  );
};

export {createHeaderTemplate};
