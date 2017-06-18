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
  - BoardLink             | passed Props: boardIndexPage.data (element)
  - CreateBoardDropdown

**BoardShow**             | mapStateProps: boardShowPage
  - List                  | passed Props: boardShowPage.data.lists (element)
  - CreateList            | passed Props: boardShowPage.data.id

**List**                | passed Props: list (from boardShowPage.data.lists (element))
  - Card                  | passed Props: list.cards (element)
  - NewCardDropdown       | passed Props: list.id

**Card**                  | passed Props: card (from list.cards (element))
  - CardDetailModal       | mapStateProps: cardModalPage

**CardDetailModal**
  - NewCommentBox         | passed Props: card.id
  - CommentIndex          | passed Props: cardModalPage.data.comments
