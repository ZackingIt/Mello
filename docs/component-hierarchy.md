## Component Hierarchy (MVP)

**AuthForm**
  - Greeting

**App**
  - Header
  - Router
    - BoardIndex
    - BoardShow

**Header**
  - BoardMenuDropdown
  - NewBoardDropdown
  - UserMenuDropdown
  - Search (later)

**BoardIndex**            | mapStateProps: boardIndexPage
  - BoardLink             | pass Props: boardIndexPage.data (element)
  - CreateBoardDropdown

**BoardShow**             | mapStateProps: boardShowPage
  - List                  | pass Props: boardShowPage.data.lists (element)
  - CreateList            | pass Props: boardShowPage.data.id

**List**                  | pass Props: list (from boardShowPage.data.lists (element))
  - Card                  | pass Props: list.cards (element)
  - NewCardDropdown       | pass Props: list.id

**Card**                  | pass Props: card (from list.cards (element))
  - CardDetailModal       | pass Props: 

**CardDetailModal**
  - NewCommentBox
  - CommentIndex
