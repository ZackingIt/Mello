## Component Hierarchy (MVP)

**AuthForm**
  - Greeting

**App**
  - Header
  - Router
    - BoardIndex
    - BoardShow

**Header** ________________ mapStateProps: header
  - BoardMenuDropdown _____ passed Props: header.boards
  - NewBoardDropdown
  - UserMenuDropdown ______ passed Props: header.user
  - Search (later)

**BoardIndex** ____________ mapStateProps: boardIndexPage
  - BoardLink _____________ passed Props: boardIndexPage.data (element)
  - CreateBoardDropdown

**BoardShow** _____________ mapStateProps: boardShowPage
  - List __________________ passed Props: boardShowPage.data.lists (element)
  - CreateList ____________ passed Props: boardShowPage.data.id

**List** _________________ passed Props: list (from boardShowPage.data.lists (element))
  - Card _________________ passed Props: list.cards (element)
  - NewCardDropdown ______ passed Props: list.id

**Card** _________________ passed Props: card (from list.cards (element))
  - CardDetailModal ______ mapStateProps: cardModalPage

**CardDetailModal**
  - NewCommentBox ________ passed Props: card.id
  - CommentIndex _________ passed Props: cardModalPage.data.comments

### Routes
  Path               | Component    |
  -------------------|--------------|
  /signup            | Greeting     |
  /signin            | Greeting     |
  /home              | BoardIndex   |
  /home/:id          | BoardShow    |
